import { Link } from "react-router-dom";

import heroImage from "../../assets/images/restaurant-hero.png";

import {
    FaCalendarCheck,
    FaClipboardList,
    FaLock,
    FaUserShield
} from "react-icons/fa";

import "./Home.css";


function Home() {

    return (

        <>
            {/* HERO + FEATURES */}

            <section className="landing">

                <div className="container landing-grid">

                    {/* Left */}

                    <div className="hero-content">

                        <h1>
                            Restaurant Reservation
                            <span> Management System</span>
                        </h1>

                        <p>
                            Reserve restaurant tables quickly and securely.
                            Customers can create reservations while
                            administrators efficiently manage bookings.
                        </p>

                        <Link
                            to="/login"
                            className="primary-btn"
                        >
                            Book a Table
                        </Link>

                    </div>

                    {/* Center */}

                    <div className="hero-image">

                        <img
                            src={heroImage}
                            alt="Restaurant"
                        />

                    </div>

                    {/* Right */}

                    <div className="feature-panel">

                        <div className="feature-card">
                            <FaCalendarCheck />
                            <span>Table Reservation</span>
                        </div>

                        <div className="feature-card">
                            <FaClipboardList />
                            <span>Reservation Management</span>
                        </div>

                        <div className="feature-card">
                            <FaLock />
                            <span>Secure Login</span>
                        </div>

                        <div className="feature-card">
                            <FaUserShield />
                            <span>Admin Dashboard</span>
                        </div>

                    </div>

                </div>

            </section>

        </>

    );

}

export default Home;