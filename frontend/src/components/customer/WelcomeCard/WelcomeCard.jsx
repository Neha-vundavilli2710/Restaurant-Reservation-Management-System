import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

function WelcomeCard({ user }) {

    const { logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <div className="welcome-card">

            <div>

                <h1>

                    Welcome, {user?.name}

                </h1>

                <p>

                    Browse available tables and manage your reservations with ease.

                </p>

            </div>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >

                <FaSignOutAlt />

                Logout

            </button>

        </div>

    );

}

export default WelcomeCard;