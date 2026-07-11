import { FaEdit } from "react-icons/fa";

import "./ReservationManagement.css";

function ReservationManagement() {

    return (

        <section className="reservation-management">

            <div className="reservation-header">

                <h2>

                    Reservations

                </h2>

            </div>

            <div className="reservation-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>Customer</th>

                            <th>Table</th>

                            <th>Date</th>

                            <th>Time</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td>Neha</td>

                            <td>Table 2</td>

                            <td>12 Jul 2026</td>

                            <td>7:00 PM</td>

                            <td>

                                <span className="status pending">

                                    Pending

                                </span>

                            </td>

                            <td>

                                <button className="update-btn">

                                    <FaEdit />

                                    Update

                                </button>

                            </td>

                        </tr>

                        <tr>

                            <td>Rahul</td>

                            <td>Table 4</td>

                            <td>13 Jul 2026</td>

                            <td>8:30 PM</td>

                            <td>

                                <span className="status confirmed">

                                    Confirmed

                                </span>

                            </td>

                            <td>

                                <button className="update-btn">

                                    <FaEdit />

                                    Update

                                </button>

                            </td>

                        </tr>

                        <tr>

                            <td>Priya</td>

                            <td>Table 1</td>

                            <td>14 Jul 2026</td>

                            <td>6:30 PM</td>

                            <td>

                                <span className="status cancelled">

                                    Cancelled

                                </span>

                            </td>

                            <td>

                                <button className="update-btn">

                                    <FaEdit />

                                    Update

                                </button>

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </section>

    );

}

export default ReservationManagement;