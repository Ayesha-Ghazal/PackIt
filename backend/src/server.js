require("dotenv").config();

const express = require("express");
const { poolPromise } = require("./config/db");
const tripRoutes = require("./routes/tripRoutes");
const packingRoutes = require("./routes/packingRoutes");

const app = express();

// Middleware
app.use(express.json());

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        service: "PackIt Backend"
    });
});

// Routes
app.use("/api/trips", tripRoutes);
app.use("/api/items", packingRoutes);

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to PackIt API"
    });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await poolPromise;

        app.listen(PORT, () => {
            console.log(`PackIt server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
}

startServer();