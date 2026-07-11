import {
    FaCalendarCheck,
    FaClipboardList,
    FaLock,
    FaUserShield
} from "react-icons/fa";

const Features = () => {
    return (
        <section className="features">

            <div className="container">

                <div className="section-title">
                    <h2>Our Features</h2>
                </div>

                <div className="feature-grid">

                    <div className="feature-card">
                        <FaCalendarCheck className="feature-icon" />
                        <h3>Table Reservation</h3>
                    </div>

                    <div className="feature-card">
                        <FaClipboardList className="feature-icon" />
                        <h3>Reservation Management</h3>
                    </div>

                    <div className="feature-card">
                        <FaLock className="feature-icon" />
                        <h3>Secure Login</h3>
                    </div>

                    <div className="feature-card">
                        <FaUserShield className="feature-icon" />
                        <h3>Admin Dashboard</h3>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default Features;