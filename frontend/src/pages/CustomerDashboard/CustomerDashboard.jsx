import { useEffect, useState } from "react";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import WelcomeCard from "../../components/customer/WelcomeCard/WelcomeCard";
import DashboardStats from "../../components/customer/DashboardStats/DashboardStats";
import AvailableTables from "../../components/customer/AvailableTables/AvailableTables";
import MyReservations from "../../components/customer/MyReservations/MyReservations";

import "./CustomerDashboard.css";

function CustomerDashboard() {

    const { user } = useAuth();

    const [tables, setTables] = useState([]);
    const [reservations, setReservations] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadDashboard = async () => {

        try {

            const [

                tableResponse,

                reservationResponse

            ] = await Promise.all([

                api.get("/reservations/tables"),

                api.get("/reservations/my")

            ]);

            setTables(tableResponse.data.tables);

            setReservations(reservationResponse.data.reservations);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadDashboard();

    }, []);

    return (

        <section className="customer-dashboard">

            <div className="container">

                <WelcomeCard user={user} />

                <DashboardStats

                    tables={tables}

                    reservations={reservations}

                />

                <AvailableTables

                    tables={tables}

                    loading={loading}

                    refreshDashboard={loadDashboard}

                />

                <MyReservations

                    reservations={reservations}

                    refreshDashboard={loadDashboard}

                />

            </div>

        </section>

    );

}

export default CustomerDashboard;