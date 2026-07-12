import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../../services/api";

import "./ReservationManagement.css";

function ReservationManagement() {

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState("");

    const fetchReservations = async () => {

        try {

            setLoading(true);

            const response = await api.get("/admin/reservations");

            setReservations(response.data.reservations);

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to load reservations.");

        }

        finally {

            setLoading(false);

        }

    };

    const filterReservationsByDate = async () => {

        if (!selectedDate) {

            fetchReservations();

            return;

        }

        try {

            setLoading(true);

            const response = await api.get(
                `/admin/reservations/date?date=${selectedDate}`
            );

            setReservations(response.data.reservations);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to fetch reservations.");

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchReservations();

    }, []);

    const handleStatusUpdate = async (reservationId, status) => {

        try {

            await api.patch(

                `/admin/reservations/${reservationId}/status`,

                {

                    status

                }

            );

            toast.success("Reservation Updated Successfully.");

            fetchReservations();

        }

        catch (error) {

            toast.error(

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

                <div className="reservation-filter">

                    <input

                        type="date"

                        value={selectedDate}

                        onChange={(e) =>

                            setSelectedDate(e.target.value)

                        }

                    />

                    <button

                        className="update-btn"

                        onClick={filterReservationsByDate}

                    >

                        Filter

                    </button>

                    <button

                        className="update-btn"

                        onClick={() => {

                            setSelectedDate("");

                            fetchReservations();

                        }}

                    >

                        Show All

                    </button>

                </div>

            </div>

            <div className="reservation-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>Customer</th>
                            <th>Table</th>
                            <th>Date</th>
                            <th>Time Slot</th>
                            <th>Guests</th>
                            <th>Status</th>
                            <th>Update Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            loading ?

                                (

                                    <tr>

                                        <td colSpan="7">

                                            Loading...

                                        </td>

                                    </tr>

                                )

                                :

                                reservations.length === 0 ?

                                    (

                                        <tr>

                                            <td colSpan="7">

                                                No Reservations Found

                                            </td>

                                        </tr>

                                    )

                                    :

                                    reservations.map((reservation) => (

                                        <tr key={reservation._id}>

                                            <td>

                                                {reservation.customer?.name || "N/A"}

                                            </td>

                                            <td>

                                                {reservation.table?.tableNumber || "Deleted"}

                                            </td>

                                            <td>

                                                {

                                                    reservation.reservationDate

                                                        ?

                                                        new Date(

                                                            reservation.reservationDate

                                                        ).toLocaleDateString("en-GB")

                                                        :

                                                        "--"

                                                }

                                            </td>

                                            <td>

                                                {reservation.timeSlot || "--"}

                                            </td>

                                            <td>

                                                {reservation.guests}

                                            </td>

                                            <td>

                                                <span

                                                    className={

                                                        reservation.status === "confirmed"

                                                            ?

                                                            "status confirmed"

                                                            :

                                                            "status cancelled"

                                                    }

                                                >

                                                    {

                                                        reservation.status.charAt(0).toUpperCase() +

                                                        reservation.status.slice(1)

                                                    }

                                                </span>

                                            </td>

                                            <td>

                                                <select

                                                    className="status-select"

                                                    value={reservation.status}

                                                    onChange={(e) =>

                                                        handleStatusUpdate(

                                                            reservation._id,

                                                            e.target.value

                                                        )

                                                    }

                                                >

                                                    <option value="confirmed">

                                                        Confirmed

                                                    </option>

                                                    <option value="cancelled">

                                                        Cancelled

                                                    </option>

                                                </select>

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