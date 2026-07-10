const Reservation = require("../models/Reservation");
const RESERVATION_STATUS = require("../constants/reservationStatus");

const getAllReservations = async (req, res) => {

    try {

        const reservations = await Reservation.find()
            .populate("customer", "name email")
            .populate("table", "tableNumber capacity")
            .sort({ createdAt: -1 });

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
    getAllReservations,
    updateReservationStatus
};