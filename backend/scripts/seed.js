require("dotenv").config();

const connectDB = require("../config/db");

const seedAdmin = require("../seed/seedAdmin");
const seedTables = require("../seed/seedTables");

const runSeed = async () => {

    try {

        await connectDB();

        await seedAdmin();

        await seedTables();

        console.log("Database seeding completed.");

        process.exit();

    } catch (error) {

        console.log(error.message);

        process.exit(1);

    }

};

runSeed();