const reservationService = require("../services/reservationService");

const createReservation = async (req, res) => {

    try {

        const {

            tableId,

            reservationDate,

            timeSlot,

            guests

        } = req.body;

        const reservation =
            await reservationService.createReservation({

                customer: req.user._id,

                tableId,

                reservationDate,

                timeSlot,

                guests

            });

        res.status(201).json({

            success: true,

            message: "Reservation created successfully.",

            reservation

        });

    }

    catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

const getMyReservations = async (req, res) => {

    try {

        const reservations =
            await reservationService.getCustomerReservations(
                req.user._id
            );

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

const cancelReservation = async (req, res) => {

    try {

        const reservation =
            await reservationService.cancelReservation(

                req.params.id,

                req.user._id

            );

        res.status(200).json({

            success: true,

            message: "Reservation cancelled successfully.",

            reservation

        });

    }

    catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

const getAvailableTables = async (req, res) => {

    try {

        const tables =
            await reservationService.getAvailableTables();

        res.status(200).json({

            success: true,

            count: tables.length,

            tables

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    createReservation,

    getMyReservations,

    cancelReservation,

    getAvailableTables

};