const Table = require("../models/Table");

const restaurantTables = [
    { tableNumber: "T1", capacity: 2 },
    { tableNumber: "T2", capacity: 2 },
    { tableNumber: "T3", capacity: 4 },
    { tableNumber: "T4", capacity: 4 },
    { tableNumber: "T5", capacity: 4 },
    { tableNumber: "T6", capacity: 6 },
    { tableNumber: "T7", capacity: 6 },
    { tableNumber: "T8", capacity: 8 }
];

const seedTables = async () => {
    try {

        const existingTables = await Table.countDocuments();

        if (existingTables > 0) {
            console.log("Restaurant tables already exist.");
            return;
        }

        await Table.insertMany(restaurantTables);

        console.log("Restaurant tables seeded successfully.");

    } catch (error) {
        console.log(error.message);
    }
};

module.exports = seedTables;