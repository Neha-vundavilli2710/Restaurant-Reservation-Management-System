const Reservation = require("../models/Reservation");
const Table = require("../models/Table");
const mongoose = require("mongoose");
const createReservation = async (reservationData) => {

    const {
        customer,
        reservationDate,
        timeSlot,
        guests
    } = reservationData;

    // Find all active tables that can accommodate the guests
    const suitableTables = await Table.find({
        isActive: true,
        capacity: { $gte: guests }
    }).sort({ capacity: 1 });

    if (suitableTables.length === 0) {
        throw new Error("No table can accommodate the requested number of guests.");
    }

    let assignedTable = null;

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
        throw new Error("No tables are available for the selected date and time slot.");
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
        throw new Error("You can only cancel your own reservation.");
    }

    reservation.status = "cancelled";

    await reservation.save();

    return reservation;
};
module.exports = {
    createReservation,
    getCustomerReservations,
    cancelReservation
};