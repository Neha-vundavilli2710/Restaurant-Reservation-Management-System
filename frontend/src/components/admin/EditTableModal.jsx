import { useState } from "react";

import api from "../../services/api";

import "./EditTableModal.css";

function EditTableModal({

    table,

    closeModal,

    refreshTables

}) {

    const [tableNumber, setTableNumber] = useState(table.tableNumber);

    const [capacity, setCapacity] = useState(table.capacity);

    const [status, setStatus] = useState(table.status);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await api.put(`/admin/tables/${table._id}`, {

                tableNumber,

                capacity,

                status

            });

            alert("Table Updated Successfully");

            refreshTables();

            closeModal();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to update table."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Edit Table</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Table Number</label>

                        <input

                            value={tableNumber}

                            onChange={(e) => setTableNumber(e.target.value)}

                        />

                    </div>

                    <div className="form-group">

                        <label>Capacity</label>

                        <input

                            type="number"

                            value={capacity}

                            onChange={(e) => setCapacity(Number(e.target.value))}

                        />

                    </div>

                    <div className="form-group">

                        <label>Status</label>

                        <select

                            value={status}

                            onChange={(e) => setStatus(e.target.value)}

                        >

                            <option>

                                Available

                            </option>

                            <option>

                                Reserved

                            </option>

                        </select>

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

                        >

                            {

                                loading ?

                                    "Updating..."

                                    :

                                    "Update"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditTableModal;