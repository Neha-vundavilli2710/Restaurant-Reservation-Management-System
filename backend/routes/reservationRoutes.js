const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    createReservation,
    getMyReservations,
    cancelReservation
} = require("../controllers/reservationController");

const router = express.Router();

router.post("/", protect, createReservation);
router.get("/my", protect, getMyReservations);
router.patch("/:id/cancel", protect, cancelReservation);

module.exports = router;