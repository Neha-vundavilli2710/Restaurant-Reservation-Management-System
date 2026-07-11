const express = require("express");

const protect = require("../middleware/authMiddleware");

const {

    createReservation,

    getMyReservations,

    cancelReservation,

    getAvailableTables

} = require("../controllers/reservationController");

const router = express.Router();

router.get(
    "/tables",
    protect,
    getAvailableTables
);

router.post(
    "/",
    protect,
    createReservation
);

router.get(
    "/my",
    protect,
    getMyReservations
);

router.patch(
    "/:id/cancel",
    protect,
    cancelReservation
);

module.exports = router;