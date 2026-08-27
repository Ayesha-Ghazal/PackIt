const express = require("express");
const router = express.Router();

const { sql, poolPromise } = require("../config/db");

// Add a packing item
router.post("/", async (req, res) => {
    try {
        const { TripId, Name, Category } = req.body;

        if (!TripId || !Name || !Category) {
            return res.status(400).json({
                message: "TripId, Name and Category are required"
            });
        }

        const pool = await poolPromise;

        const result = await pool.request()
            .input("TripId", sql.Int, TripId)
            .input("Name", sql.NVarChar, Name)
            .input("Category", sql.NVarChar, Category)
            .input("IsPacked", sql.Bit, false)
            .query(`
                INSERT INTO PackingItems
                (TripId, Name, Category, IsPacked)
                OUTPUT INSERTED.*
                VALUES
                (@TripId, @Name, @Category, @IsPacked)
            `);

        res.status(201).json({
            message: "Packing item added successfully",
            item: result.recordset[0]
        });

    } catch (error) {
        console.error("Error adding packing item:", error);

        res.status(500).json({
            message: "Failed to add packing item"
        });
    }
});


// Get all packing items for a trip
router.get("/:tripId", async (req, res) => {
    try {
        const tripId = parseInt(req.params.tripId);

        const pool = await poolPromise;

        const result = await pool.request()
            .input("TripId", sql.Int, tripId)
            .query(`
                SELECT *
                FROM PackingItems
                WHERE TripId = @TripId
                ORDER BY Id
            `);

        res.status(200).json(result.recordset);

    } catch (error) {
        console.error("Error fetching packing items:", error);

        res.status(500).json({
            message: "Failed to fetch packing items"
        });
    }
});


// Mark item as packed/unpacked
router.put("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { IsPacked } = req.body;

        if (typeof IsPacked !== "boolean") {
            return res.status(400).json({
                message: "IsPacked must be true or false"
            });
        }

        const pool = await poolPromise;

        const result = await pool.request()
            .input("Id", sql.Int, id)
            .input("IsPacked", sql.Bit, IsPacked)
            .query(`
                UPDATE PackingItems
                SET IsPacked = @IsPacked
                OUTPUT INSERTED.*
                WHERE Id = @Id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "Packing item not found"
            });
        }

        res.status(200).json({
            message: "Packing item updated successfully",
            item: result.recordset[0]
        });

    } catch (error) {
        console.error("Error updating packing item:", error);

        res.status(500).json({
            message: "Failed to update packing item"
        });
    }
});

module.exports = router;