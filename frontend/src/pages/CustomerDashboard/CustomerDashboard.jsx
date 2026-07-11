import "./CustomerDashboard.css";

import {
    FaUtensils,
    FaCalendarAlt,
    FaClock,
    FaChair,
    FaUsers,
    FaCheckCircle,
    FaTimesCircle,
    FaSignOutAlt
} from "react-icons/fa";

function CustomerDashboard() {

    return (

        <section className="customer-dashboard">

            <div className="container">

                {/* Welcome */}

                <div className="welcome-card">

                    <div>

                        <h1>
                            Welcome, Neha
                        </h1>

                        <p>
                            Browse available tables and manage your reservations with ease.
                        </p>

                    </div>

                    <button className="logout-btn">

                        <FaSignOutAlt />

                        Logout

                    </button>

                </div>


                {/* Statistics */}

                <div className="stats-grid">

                    <div className="stat-card">

                        <FaUtensils className="stat-icon" />

                        <h2>12</h2>

                        <p>Available Tables</p>

                    </div>

                    <div className="stat-card">

                        <FaCalendarAlt className="stat-icon" />

                        <h2>2</h2>

                        <p>My Reservations</p>

                    </div>

                    <div className="stat-card">

                        <FaClock className="stat-icon" />

                        <h2>7:00 PM</h2>

                        <p>Next Reservation</p>

                    </div>

                </div>


                {/* Available Tables */}

                <h2 className="section-title">

                    Available Tables

                </h2>


                <div className="table-grid">

                    {/* Table */}

                    <div className="table-card">

                        <div className="table-header">

                            <div className="table-title">

                                <FaChair />

                                <h3>Table 1</h3>

                            </div>

                            <span className="status available">

                                <FaCheckCircle />

                                Available

                            </span>

                        </div>

                        <div className="table-details">

                            <p>

                                <FaUsers />

                                4 Seats

                            </p>

                            <p>

                                <FaClock />

                                7:00 PM

                            </p>

                        </div>

                        <button className="reserve-btn">

                            Reserve

                        </button>

                    </div>



                    <div className="table-card">

                        <div className="table-header">

                            <div className="table-title">

                                <FaChair />

                                <h3>Table 2</h3>

                            </div>

                            <span className="status available">

                                <FaCheckCircle />

                                Available

                            </span>

                        </div>

                        <div className="table-details">

                            <p>

                                <FaUsers />

                                6 Seats

                            </p>

                            <p>

                                <FaClock />

                                8:30 PM

                            </p>

                        </div>

                        <button className="reserve-btn">

                            Reserve

                        </button>

                    </div>



                    <div className="table-card">

                        <div className="table-header">

                            <div className="table-title">

                                <FaChair />

                                <h3>Table 3</h3>

                            </div>

                            <span className="status reserved">

                                <FaTimesCircle />

                                Reserved

                            </span>

                        </div>

                        <div className="table-details">

                            <p>

                                <FaUsers />

                                2 Seats

                            </p>

                            <p>

                                <FaClock />

                                Reserved

                            </p>

                        </div>

                        <button
                            disabled
                            className="reserve-btn disabled"
                        >

                            Reserved

                        </button>

                    </div>

                </div>



                {/* Reservations */}

                <h2 className="section-title">

                    My Reservations

                </h2>


                <div className="reservation-card">

                    <div className="reservation-top">

                        <h3>

                            Reservation #102

                        </h3>

                        <span className="confirmed">

                            Confirmed

                        </span>

                    </div>


                    <div className="reservation-details">

                        <div>

                            <FaChair />

                            <span>

                                Table 4

                            </span>

                        </div>

                        <div>

                            <FaCalendarAlt />

                            <span>

                                12 July 2026

                            </span>

                        </div>

                        <div>

                            <FaClock />

                            <span>

                                7:00 PM

                            </span>

                        </div>

                    </div>


                    <button className="cancel-btn">

                        Cancel Reservation

                    </button>

                </div>

            </div>

        </section>

    );

}

export default CustomerDashboard;