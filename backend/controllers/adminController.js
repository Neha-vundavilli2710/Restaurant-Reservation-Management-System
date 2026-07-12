const Reservation = require("../models/Reservation");
const Table = require("../models/Table");
const RESERVATION_STATUS = require("../constants/reservationStatus");

/* ======================================================
   TABLE MANAGEMENT
====================================================== */

// Get All Tables
const getAllTables = async (req, res) => {
    try {

        const tables = await Table.find().sort({
            tableNumber: 1
        });

        res.status(200).json({
            success: true,
            count: tables.length,
            tables
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// Create Table
const createTable = async (req, res) => {

    try {

        const {
            tableNumber,
            capacity
        } = req.body;

        if (!tableNumber || !capacity) {

            return res.status(400).json({
                success: false,
                message: "Table number and capacity are required."
            });

        }

        const existingTable = await Table.findOne({
            tableNumber
        });

        if (existingTable) {

            return res.status(400).json({
                success: false,
                message: "Table already exists."
            });

        }

        const table = await Table.create({

            tableNumber,
            capacity

        });

        res.status(201).json({

            success: true,
            message: "Table created successfully.",
            table

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// Update Table
const updateTable = async (req, res) => {

    try {

        const table = await Table.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!table) {

            return res.status(404).json({

                success: false,
                message: "Table not found."

            });

        }

        res.status(200).json({

            success: true,
            message: "Table updated successfully.",
            table

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// Delete Table
const deleteTable = async (req, res) => {

    try {

        const table = await Table.findById(req.params.id);

        if (!table) {

            return res.status(404).json({

                success: false,
                message: "Table not found."

            });

        }

        await table.deleteOne();

        res.status(200).json({

            success: true,
            message: "Table deleted successfully."

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



/* ======================================================
   RESERVATION MANAGEMENT
====================================================== */

// Get All Reservations
const getAllReservations = async (req, res) => {

    try {

        const reservations = await Reservation.find()

            .populate("customer", "name email")

            .populate("table", "tableNumber capacity")

            .sort({
                createdAt: -1
            });

        res.status(200).json({

            success: true,
            count: reservations.length,
            reservations

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

const getReservationsByDate = async (req, res) => {

    try {

        const { date } = req.query;

        if (!date) {

            return res.status(400).json({

                success: false,

                message: "Date is required."

            });

        }

        const startDate = new Date(date);

        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(date);

        endDate.setHours(23, 59, 59, 999);

        const reservations = await Reservation.find({

            reservationDate: {

                $gte: startDate,

                $lte: endDate

            }

        })

        .populate("customer", "name email")

        .populate("table", "tableNumber capacity")

        .sort({

            reservationDate: 1

        });

        res.status(200).json({

            success: true,

            count: reservations.length,

            reservations

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// Update Reservation Status
const updateReservationStatus = async (req, res) => {

    try {

        const { status } = req.body;

        if (

            status !== RESERVATION_STATUS.CONFIRMED &&

            status !== RESERVATION_STATUS.CANCELLED

        ) {

            return res.status(400).json({

                success: false,
                message: "Invalid reservation status."

            });

        }

        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {

            return res.status(404).json({

                success: false,
                message: "Reservation not found."

            });

        }

        reservation.status = status;

        await reservation.save();

        res.status(200).json({

            success: true,
            message: "Reservation status updated successfully.",
            reservation

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



module.exports = {

    // Table APIs
    getAllTables,
    createTable,
    updateTable,
    deleteTable,

    // Reservation APIs
    getAllReservations,
    getReservationsByDate,
    updateReservationStatus

};