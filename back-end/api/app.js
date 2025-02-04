const express = require("express");
const cors = require("cors");
const userRoutes = require("../src/routes/user.Routes");
const adminRoutes = require("../src/routes/admin.Routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
    console.error("Error:", err); // Yeh error terminal pe print karega
    res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app