const mongoose = require("mongoose");
const ROLES = require("../constants/roles");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: [ROLES.CUSTOMER, ROLES.ADMIN],
            default: ROLES.CUSTOMER
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);