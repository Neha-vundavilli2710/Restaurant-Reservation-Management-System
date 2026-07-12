import { useState } from "react";
import toast from "react-hot-toast";

import TIME_SLOTS from "../../../constants/timeSlots";

import api from "../../../services/api";

import "./ReserveModal.css";

function ReserveModal({

    table,

    closeModal,

    refreshDashboard

}) {

    const [reservationDate, setReservationDate] = useState("");

    const [timeSlot, setTimeSlot] = useState("");

    const [guests, setGuests] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await api.post("/reservations", {

                tableId: table._id,

                reservationDate,

                timeSlot,

                guests: Number(guests)

            });

            toast.success("Reservation Created Successfully");

            refreshDashboard();

            closeModal();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to create reservation."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>

                    Reserve {table.tableNumber}

                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>

                            Reservation Date

                        </label>

                        <input

                            type="date"

                            required

                            value={reservationDate}

                            onChange={(e) =>

                                setReservationDate(e.target.value)

                            }

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Time Slot

                        </label>

                        <select
                            value={timeSlot}
                            onChange={(e) => setTimeSlot(e.target.value)}
                            required
                >

                            <option value="">

                                Select Time Slot

                            </option>

                            {TIME_SLOTS.map((slot) => (

                                <option
                                    key={slot}
                                    value={slot}
                                >
                                    {slot}
                            </option>

                            ))}

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Number of Guests

                        </label>

                        <input

                            type="number"

                            min="1"

                            required

                            value={guests}

                            onChange={(e) =>

                                setGuests(e.target.value)

                            }

                        />

                    </div>

                    <div className="modal-buttons">

                        <button

                            type="button"

                            className="cancel-modal-btn"

                            onClick={closeModal}

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="save-modal-btn"

                            disabled={loading}

                        >

                            {

                                loading

                                    ? "Reserving..."

                                    : "Reserve"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default ReserveModal;