import {

    FaUtensils,

    FaCalendarAlt,

    FaClock

} from "react-icons/fa";

function DashboardStats({

    tables,

    reservations

}) {

    const nextReservation =

        reservations.length > 0

            ? reservations[0].timeSlot

            : "--";

    return (

        <div className="stats-grid">

            <div className="stat-card">

                <FaUtensils className="stat-icon" />

                <h2>

                    {tables.length}

                </h2>

                <p>

                    Available Tables

                </p>

            </div>

            <div className="stat-card">

                <FaCalendarAlt className="stat-icon" />

                <h2>

                    {reservations.length}

                </h2>

                <p>

                    My Reservations

                </p>

            </div>

            <div className="stat-card">

                <FaClock className="stat-icon" />

                <h2>

                    {nextReservation}

                </h2>

                <p>

                    Next Reservation

                </p>

            </div>

        </div>

    );

}

export default DashboardStats;