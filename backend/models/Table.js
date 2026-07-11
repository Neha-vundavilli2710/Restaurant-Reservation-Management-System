const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
    {
        tableNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        capacity: {
            type: Number,
            required: true,
            min: 1
        },

        status: {
            type: String,
            enum: ["Available", "Reserved"],
            default: "Available"
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Table", tableSchema);