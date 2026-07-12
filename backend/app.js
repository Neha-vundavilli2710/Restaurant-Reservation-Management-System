const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://restaurant-reservation-management-s-lilac.vercel.app"
    ],
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Restaurant Reservation API is running."
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;