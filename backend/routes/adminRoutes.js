const express = require("express");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    // Table Management
    getAllTables,
    createTable,
    updateTable,
    deleteTable,

    // Reservation Management
    getAllReservations,
    getReservationsByDate,
    updateReservationStatus
} = require("../controllers/adminController");

const router = express.Router();

/* ======================================================
   TABLE ROUTES
====================================================== */

// Get All Tables
router.get(
    "/tables",
    protect,
    adminOnly,
    getAllTables
);

// Create Table
router.post(
    "/tables",
    protect,
    adminOnly,
    createTable
);

// Update Table
router.put(
    "/tables/:id",
    protect,
    adminOnly,
    updateTable
);

// Delete Table
router.delete(
    "/tables/:id",
    protect,
    adminOnly,
    deleteTable
);


/* ======================================================
   RESERVATION ROUTES
====================================================== */

// Get All Reservations
router.get(
    "/reservations",
    protect,
    adminOnly,
    getAllReservations
);


router.get(

    "/reservations/date",

    protect,

    adminOnly,

    getReservationsByDate

);


// Update Reservation Status
router.patch(
    "/reservations/:id/status",
    protect,
    adminOnly,
    updateReservationStatus
);

module.exports = router;