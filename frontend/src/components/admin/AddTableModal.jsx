import { useState } from "react";
import api from "../../services/api";
import "./AddTableModal.css";
import toast from "react-hot-toast";

function AddTableModal({ closeModal, refreshTables }) {

    const [tableNumber, setTableNumber] = useState("");
    const [capacity, setCapacity] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await api.post("/admin/tables", {
                tableNumber,
                capacity: Number(capacity)
            });

            toast.success("Table Added Successfully");

            refreshTables();

            closeModal();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to add table."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Add New Table</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Table Number</label>

                        <input
                            type="text"
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            placeholder="Table 5"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Capacity</label>

                        <input
                            type="number"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            placeholder="4"
                            required
                            min="1"
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
                            {loading ? "Saving..." : "Save"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddTableModal;