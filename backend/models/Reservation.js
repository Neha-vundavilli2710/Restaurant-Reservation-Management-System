const mongoose = require("mongoose");
const RESERVATION_STATUS = require("../constants/reservationStatus");
const TIME_SLOTS = require("../constants/timeSlots");

const reservationSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        table: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Table",
            required: true
        },

        reservationDate: {
            type: Date,
            required: true
        },

        timeSlot: {
            type: String,
        enum: TIME_SLOTS,
        required: true
    },

        guests: {
            type: Number,
            required: true,
            min: 1
        },

        status: {
            type: String,
            enum: [
                RESERVATION_STATUS.CONFIRMED,
                RESERVATION_STATUS.CANCELLED
            ],
            default: RESERVATION_STATUS.CONFIRMED
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Reservation", reservationSchema);