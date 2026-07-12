import { FaChair, FaCalendarAlt, FaClock } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../../services/api";

function MyReservations({

    reservations,

    refreshDashboard

}) {

    const cancelReservation = async (id) => {

        const confirmCancel = window.confirm(
            "Cancel this reservation?"
        );

        if (!confirmCancel) return;

        try {

            await api.patch(`/reservations/${id}/cancel`);

            toast.success("Reservation cancelled successfully.");

            refreshDashboard();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to cancel reservation."

            );

        }

    };

    return (

        <>

            <h2 className="section-title">

                My Reservations

            </h2>

            {

                reservations.length === 0 ?

                (

                    <div className="reservation-card">

                        <h3>

                            No Reservations Yet

                        </h3>

                    </div>

                )

                :

                reservations.map((reservation) => (

                    <div

                        key={reservation._id}

                        className="reservation-card"

                    >

                        <div className="reservation-top">

                            <h3>

                                {

                                    reservation.table?.tableNumber ||

                                    "Table Deleted"

                                }

                            </h3>

                            <span

                                className={reservation.status}

                            >

                                {reservation.status}

                            </span>

                        </div>

                        <div className="reservation-details">

                            <div>

                                <FaChair />

                                <span>

                                    {

                                        reservation.guests

                                    } Guests

                                </span>

                            </div>

                            <div>

                                <FaCalendarAlt />

                                <span>

                                    {

                                        reservation.reservationDate

                                        ?

                                        new Date(

                                            reservation.reservationDate

                                        ).toLocaleDateString("en-GB")

                                        :

                                        "--"

                                    }

                                </span>

                            </div>

                            <div>

                                <FaClock />

                                <span>

                                    {

                                        reservation.timeSlot ||

                                        "--"

                                    }

                                </span>

                            </div>

                        </div>

                        {

                            reservation.status !== "cancelled" &&

                            <button

                                className="cancel-btn"

                                onClick={() =>

                                    cancelReservation(

                                        reservation._id

                                    )

                                }

                            >

                                Cancel Reservation

                            </button>

                        }

                    </div>

                ))

            }

        </>

    );

}

export default MyReservations;