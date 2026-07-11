import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

import "./TableManagement.css";

function TableManagement() {

    return (

        <section className="table-management">

            <div className="table-header">

                <h2>Restaurant Tables</h2>

                <button className="add-table-btn">

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

                        <tr>

                            <td>Table 1</td>

                            <td>4 Seats</td>

                            <td>

                                <span className="status available">

                                    Available

                                </span>

                            </td>

                            <td className="actions">

                                <button className="edit-btn">

                                    <FaEdit />

                                </button>

                                <button className="delete-btn">

                                    <FaTrash />

                                </button>

                            </td>

                        </tr>

                        <tr>

                            <td>Table 2</td>

                            <td>6 Seats</td>

                            <td>

                                <span className="status reserved">

                                    Reserved

                                </span>

                            </td>

                            <td className="actions">

                                <button className="edit-btn">

                                    <FaEdit />

                                </button>

                                <button className="delete-btn">

                                    <FaTrash />

                                </button>

                            </td>

                        </tr>

                        <tr>

                            <td>Table 3</td>

                            <td>2 Seats</td>

                            <td>

                                <span className="status available">

                                    Available

                                </span>

                            </td>

                            <td className="actions">

                                <button className="edit-btn">

                                    <FaEdit />

                                </button>

                                <button className="delete-btn">

                                    <FaTrash />

                                </button>

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </section>

    );

}

export default TableManagement;