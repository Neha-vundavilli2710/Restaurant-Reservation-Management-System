import {

    useEffect,

    useState

} from "react";

import {

    FaUtensils,

    FaCheckCircle,

    FaCalendarAlt

} from "react-icons/fa";

import api from "../../services/api";

import "./DashboardCards.css";

function DashboardCards() {

    const [stats, setStats] = useState({

        totalTables: 0,

        availableTables: 0,

        reservations: 0

    });

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const [

                    tableResponse,

                    reservationResponse

                ] = await Promise.all([

                    api.get("/admin/tables"),

                    api.get("/admin/reservations")

                ]);

                const tables = tableResponse.data.tables;

                const reservations = reservationResponse.data.reservations;

                setStats({

                    totalTables: tables.length,

                    availableTables: tables.filter(

                        table => table.status === "Available"

                    ).length,

                    reservations: reservations.length

                });

            }

            catch (error) {

                console.error(error);

            }

        };

        loadDashboard();

    }, []);

    return (

        <div className="admin-cards">

            <div className="admin-card">

                <FaUtensils />

                <h2>

                    {stats.totalTables}

                </h2>

                <p>

                    Total Tables

                </p>

            </div>

            <div className="admin-card">

                <FaCheckCircle />

                <h2>

                    {stats.availableTables}

                </h2>

                <p>

                    Available Tables

                </p>

            </div>

            <div className="admin-card">

                <FaCalendarAlt />

                <h2>

                    {stats.reservations}

                </h2>

                <p>

                    Reservations

                </p>

            </div>

        </div>

    );

}

export default DashboardCards;