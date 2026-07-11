import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

import api from "../../services/api";

import AddTableModal from "./AddTableModal";
import EditTableModal from "./EditTableModal";

import "./TableManagement.css";

function TableManagement() {

    const [tables, setTables] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [selectedTable, setSelectedTable] = useState(null);

    const fetchTables = async () => {

        try {

            setLoading(true);

            const response = await api.get("/admin/tables");

            setTables(response.data.tables);

        }

        catch (error) {

            console.error(error);

            alert("Failed to load tables.");

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchTables();

    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this table?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/admin/tables/${id}`);

            alert("Table deleted successfully.");

            fetchTables();

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to delete table."
            );

        }

    };

    return (

        <>

            <section className="table-management">

                <div className="table-header">

                    <h2>Restaurant Tables</h2>

                    <button
                        className="add-table-btn"
                        onClick={() => setShowModal(true)}
                    >

                        <FaPlus />

                        Add Table

                    </button>

                </div>

                <div className="table-wrapper">

                    <table>

                        <thead>

                            <tr>

                                <th>Table</th>

                                <th>Capacity</th>

                                <th>Status</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                loading ?

                                    (

                                        <tr>

                                            <td colSpan="4">

                                                Loading...

                                            </td>

                                        </tr>

                                    )

                                    :

                                    tables.map((table) => (

                                        <tr key={table._id}>

                                            <td>

                                                {table.tableNumber}

                                            </td>

                                            <td>

                                                {table.capacity} Seats

                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        table.status === "Available"
                                                            ? "status available"
                                                            : "status reserved"
                                                    }
                                                >

                                                    {table.status}

                                                </span>

                                            </td>

                                            <td className="actions">

                                                <button
                                                    className="edit-btn"
                                                    onClick={() => {

                                                        setSelectedTable(table);

                                                        setShowEditModal(true);

                                                    }}
                                                >

                                                    <FaEdit />

                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(table._id)}
                                                >

                                                    <FaTrash />

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                            }

                        </tbody>

                    </table>

                </div>

            </section>

            {

                showModal &&

                <AddTableModal

                    closeModal={() => setShowModal(false)}

                    refreshTables={fetchTables}

                />

            }

            {

                showEditModal &&

                <EditTableModal

                    table={selectedTable}

                    closeModal={() => setShowEditModal(false)}

                    refreshTables={fetchTables}

                />

            }

        </>

    );

}

export default TableManagement;