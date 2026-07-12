const Reservation = require("../models/Reservation");
const Table = require("../models/Table");
const mongoose = require("mongoose");

const createReservation = async (reservationData) => {

    const {
        customer,
        tableId,
        reservationDate,
        timeSlot,
        guests
    } = reservationData;

    let assignedTable = null;

    if (tableId) {

        // Customer picked a specific table in the UI - honor that choice
        // instead of silently swapping it for a different one.
        const requestedTable = await Table.findOne({
            _id: tableId,
            isActive: true
        });

        if (!requestedTable) {
            throw new Error("The selected table is not available.");
        }

        if (requestedTable.capacity < guests) {
            throw new Error(
                "The selected table does not have enough seats for this many guests."
            );
        }

        const conflict = await Reservation.findOne({
            table: requestedTable._id,
            reservationDate: new Date(reservationDate),
            timeSlot,
            status: "confirmed"
        });

        if (conflict) {
            throw new Error(
                "This table is already booked for the selected date and time slot."
            );
        }

        assignedTable = requestedTable;

    } else {

        // No specific table requested - fall back to auto-assigning the
        // smallest suitable table that's free.
        const suitableTables = await Table.find({
            isActive: true,
            capacity: { $gte: guests }
        }).sort({ capacity: 1 });

        if (suitableTables.length === 0) {
            throw new Error(
                "No table can accommodate the requested number of guests."
            );
        }

        for (const table of suitableTables) {

            const existingReservation = await Reservation.findOne({
                table: table._id,
                reservationDate: new Date(reservationDate),
                timeSlot,
                status: "confirmed"
            });

            if (!existingReservation) {
                assignedTable = table;
                break;
            }

        }

        if (!assignedTable) {
            throw new Error(
                "No tables are available for the selected date and time slot."
            );
        }

    }

    const reservation = await Reservation.create({

        customer,

        table: assignedTable._id,

        reservationDate,

        timeSlot,

        guests

    });

    return reservation;

};

const getCustomerReservations = async (customerId) => {

    const reservations = await Reservation.find({

        customer: customerId

    })

        .populate("table", "tableNumber capacity")

        .sort({ createdAt: -1 });

    return reservations;

};

const cancelReservation = async (reservationId, customerId) => {

    reservationId = reservationId.trim().replace(/^"|"$/g, "");

    if (!mongoose.Types.ObjectId.isValid(reservationId)) {
        throw new Error("Invalid reservation ID.");
    }

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
        throw new Error("Reservation not found.");
    }

    if (reservation.customer.toString() !== customerId.toString()) {
        throw new Error(
            "You can only cancel your own reservation."
        );
    }

    reservation.status = "cancelled";

    await reservation.save();

    return reservation;

};

const getAvailableTables = async () => {

    const tables = await Table.find({

        isActive: true

    }).sort({

        tableNumber: 1

    });

    return tables;

};

module.exports = {

    createReservation,

    getCustomerReservations,

    cancelReservation,

    getAvailableTables

};