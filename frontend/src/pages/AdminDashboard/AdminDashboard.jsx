import { useRef } from "react";

import Topbar from "../../components/admin/Topbar";
import DashboardCards from "../../components/admin/DashboardCards";
import TableManagement from "../../components/admin/TableManagement";
import ReservationManagement from "../../components/admin/ReservationManagement";

import "./AdminDashboard.css";

function AdminDashboard() {

    const dashboardRef = useRef(null);

    const tablesRef = useRef(null);

    const reservationsRef = useRef(null);

    return (

        <>

            <div ref={dashboardRef}>

                <Topbar />

                <DashboardCards />

            </div>

            <div ref={tablesRef}>

                <TableManagement />

            </div>

            <div ref={reservationsRef}>

                <ReservationManagement />

            </div>

        </>

    );

}

export default AdminDashboard;