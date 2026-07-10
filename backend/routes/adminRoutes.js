const express = require("express");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    getAllReservations,
    updateReservationStatus
} = require("../controllers/adminController");

const router = express.Router();

router.get(
    "/reservations",
    protect,
    adminOnly,
    getAllReservations
);

router.patch(
    "/reservations/:id/status",
    protect,
    adminOnly,
    updateReservationStatus
);

module.exports = router;