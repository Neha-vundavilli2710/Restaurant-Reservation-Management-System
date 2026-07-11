import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

import api from "../../services/api";

import "./ReservationManagement.css";

function ReservationManagement() {

    const [reservations, setReservations] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchReservations = async () => {

        try {

            setLoading(true);

            const response = await api.get("/admin/reservations");

            setReservations(response.data.reservations);

        }

        catch (error) {

            console.error(error);

            alert("Failed to load reservations.");

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchReservations();

    }, []);

    const handleStatusUpdate = async (reservation) => {

        const status = window.prompt(

            "Enter Status (Confirmed or Cancelled)",

            reservation.status

        );

        if (!status) return;

        try {

            await api.patch(

                `/admin/reservations/${reservation._id}/status`,
                {
                    status
                }
            );

            alert("Reservation Updated");

            fetchReservations();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to update reservation."

            );

        }

    };

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

                        {

                            loading ?

                                (

                                    <tr>

                                        <td colSpan="6">

                                            Loading...

                                        </td>

                                    </tr>

                                )

                                :

                                reservations.length === 0 ?

                                    (

                                        <tr>

                                            <td colSpan="6">

                                                No Reservations Found

                                            </td>

                                        </tr>

                                    )

                                    :

                                    reservations.map((reservation) => (

                                        <tr key={reservation._id}>

                                            <td>

                                                {reservation.customer?.name}

                                            </td>

                                            <td>

                                                {reservation.table?.tableNumber}

                                            </td>

                                            <td>

                                                {

                                                    new Date(

                                                        reservation.date

                                                    ).toLocaleDateString()

                                                }

                                            </td>

                                            <td>

                                                {reservation.time}

                                            </td>

                                            <td>

                                                <span

                                                    className={

                                                        reservation.status.toLowerCase() === "pending"

                                                            ? "status pending"

                                                            : reservation.status.toLowerCase() === "confirmed"

                                                                ? "status confirmed"

                                                                : "status cancelled"

                                                    }

                                                >

                                                    {reservation.status}

                                                </span>

                                            </td>

                                            <td>

                                                <button

                                                    className="update-btn"

                                                    onClick={() => handleStatusUpdate(reservation)}

                                                >

                                                    <FaEdit />

                                                    Update

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                        }

                    </tbody>

                </table>

            </div>

        </section>

    );

}

export default ReservationManagement;