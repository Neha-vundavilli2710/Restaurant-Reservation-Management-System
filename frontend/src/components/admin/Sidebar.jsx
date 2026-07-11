import {
    FaTachometerAlt,
    FaUtensils,
    FaCalendarAlt,
    FaSignOutAlt
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {

    return (

        <aside className="sidebar">

            <div className="sidebar-logo">

                <h2>ReserveEase</h2>

            </div>

            <nav>

                <ul>

                    <li className="active">

                        <FaTachometerAlt />

                        Dashboard

                    </li>

                    <li>

                        <FaUtensils />

                        Tables

                    </li>

                    <li>

                        <FaCalendarAlt />

                        Reservations

                    </li>

                    <li>

                        <FaSignOutAlt />

                        Logout

                    </li>

                </ul>

            </nav>

        </aside>

    );

}

export default Sidebar;