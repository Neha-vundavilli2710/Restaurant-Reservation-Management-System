import { useState } from "react";

import {
    FaChair,
    FaUsers,
    FaCheckCircle
} from "react-icons/fa";

import ReserveModal from "../ReserveModal/ReserveModal";

function AvailableTables({

    tables,

    loading,

    refreshDashboard

}) {

    const [selectedTable, setSelectedTable] = useState(null);

    return (

        <>

            <h2 className="section-title">

                Available Tables

            </h2>

            <div className="table-grid">

                {

                    loading ?

                    (

                        <div className="table-card">

                            <h3>

                                Loading tables...

                            </h3>

                        </div>

                    )

                    :

                    tables.length === 0 ?

                    (

                        <div className="table-card">

                            <h3>

                                No tables are currently available.

                            </h3>

                        </div>

                    )

                    :

                    tables.map((table) => (

                        <div
                            className="table-card"
                            key={table._id}
                        >

                            <div className="table-header">

                                <div className="table-title">

                                    <FaChair />

                                    <h3>

                                        {table.tableNumber}

                                    </h3>

                                </div>

                                <span className="status available">

                                    <FaCheckCircle />

                                    Available

                                </span>

                            </div>

                            <div className="table-details">

                                <p>

                                    <FaUsers />

                                    {table.capacity} Seats

                                </p>

                            </div>

                            <button

                                className="reserve-btn"

                                disabled={!table.isActive}

                                onClick={() => setSelectedTable(table)}

                            >

                                {table.isActive ? "Reserve" : "Unavailable"}

                            </button>

                        </div>

                    ))

                }

            </div>

            {

                selectedTable && (

                    <ReserveModal

                        table={selectedTable}

                        closeModal={() => setSelectedTable(null)}

                        refreshDashboard={refreshDashboard}

                    />

                )

            }

        </>

    );

}

export default AvailableTables;