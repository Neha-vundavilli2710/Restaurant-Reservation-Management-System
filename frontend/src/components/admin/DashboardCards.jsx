import {

    FaUtensils,
    FaCheckCircle,
    FaCalendarAlt

} from "react-icons/fa";

import "./DashboardCards.css";

function DashboardCards() {

    return (

        <div className="admin-cards">

            <div className="admin-card">

                <FaUtensils />

                <h2>20</h2>

                <p>Total Tables</p>

            </div>

            <div className="admin-card">

                <FaCheckCircle />

                <h2>14</h2>

                <p>Available Tables</p>

            </div>

            <div className="admin-card">

                <FaCalendarAlt />

                <h2>8</h2>

                <p>Reservations</p>

            </div>

        </div>

    );

}

export default DashboardCards;