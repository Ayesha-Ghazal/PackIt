const sql = require("mssql");
require("dotenv").config();

const config = {
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const poolPromise = sql.connect(config)
    .then(pool => {
        console.log("Connected to SQL Server");
        return pool;
    })
    .catch(error => {
        console.error("Database connection failed:");
        console.error(error);
        throw error;
    });

module.exports = {
    sql,
    poolPromise
};