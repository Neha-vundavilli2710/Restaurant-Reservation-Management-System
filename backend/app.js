const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

const cors = require("cors");

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://restaurant-reservation-management-s-lilac.vercel.app"
    ],
    credentials: true
}));

app.options("*", cors());

app.use(express.json());



app.get("/", (req, res) => {
    res.json({
        message: "Restaurant Reservation API is running."
    });
});



app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/admin", adminRoutes);
module.exports = app;