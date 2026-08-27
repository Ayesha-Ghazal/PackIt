require("dotenv").config();

const express = require("express");
const { poolPromise } = require("./config/db");
const tripRoutes = require("./routes/tripRoutes");

const app = express();

app.use(express.json());

// Routes
app.use("/api/trips", tripRoutes);

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