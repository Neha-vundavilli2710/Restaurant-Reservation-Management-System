import {
    FaTachometerAlt,
    FaUtensils,
    FaCalendarAlt,
    FaSignOutAlt
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "./Sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    const { logout } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <aside className="sidebar">

            <div className="sidebar-logo">

                <h2>ReserveEase</h2>

            </div>

            <nav>

                <ul>

                    <li
                        className="active"
                        onClick={() => navigate("/admin")}
                    >

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

                    <li onClick={handleLogout}>

                        <FaSignOutAlt />

                        Logout

                    </li>

                </ul>

            </nav>

        </aside>

    );

}

export default Sidebar;