const bcrypt = require("bcryptjs");

const User = require("../models/User");
const ROLES = require("../constants/roles");

const seedAdmin = async () => {

    try {

        const existingAdmin = await User.findOne({
            role: ROLES.ADMIN
        });

        if (existingAdmin) {
            console.log("Admin account already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash("Admin@123", 10);

        await User.create({
            name: "System Administrator",
            email: "admin@restaurant.com",
            password: hashedPassword,
            role: ROLES.ADMIN
        });

        console.log("Admin account created successfully.");

    } catch (error) {

        console.log(error.message);

    }

};

module.exports = seedAdmin;