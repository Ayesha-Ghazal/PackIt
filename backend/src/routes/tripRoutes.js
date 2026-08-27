const express = require("express");
const router = express.Router();

const { sql, poolPromise } = require("../config/db");

// Create a new trip
router.post("/", async (req, res) => {
    try {
        const { Name, Destination, StartDate, EndDate, Template } = req.body;

        // Basic validation
        if (!Name || !Destination || !StartDate || !EndDate) {
            return res.status(400).json({
                message: "Name, Destination, StartDate and EndDate are required"
            });
        }

        const pool = await poolPromise;

        const result = await pool.request()
            .input("Name", sql.NVarChar, Name)
            .input("Destination", sql.NVarChar, Destination)
            .input("StartDate", sql.Date, StartDate)
            .input("EndDate", sql.Date, EndDate)
            .input("Template", sql.NVarChar, Template || null)
            .query(`
                INSERT INTO Trips
                (Name, Destination, StartDate, EndDate, Template, CreatedAt)
                OUTPUT INSERTED.*
                VALUES
                (@Name, @Destination, @StartDate, @EndDate, @Template, GETDATE())
            `);

        res.status(201).json({
            message: "Trip created successfully",
            trip: result.recordset[0]
        });

    } catch (error) {
        console.error("Error creating trip:", error);

        res.status(500).json({
            message: "Failed to create trip"
        });
    }
});


// Get all trips
router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .query(`
                SELECT *
                FROM Trips
                ORDER BY CreatedAt DESC
            `);

        res.status(200).json(result.recordset);

    } catch (error) {
        console.error("Error fetching trips:", error);

        res.status(500).json({
            message: "Failed to fetch trips"
        });
    }
});

module.exports = router;