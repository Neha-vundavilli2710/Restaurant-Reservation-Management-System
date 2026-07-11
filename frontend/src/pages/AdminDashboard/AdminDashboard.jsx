import Topbar from "../../components/admin/Topbar";
import DashboardCards from "../../components/admin/DashboardCards";
import TableManagement from "../../components/admin/TableManagement";
import ReservationManagement from "../../components/admin/ReservationManagement";

import "./AdminDashboard.css";

function AdminDashboard() {

    return (

        <>

            <Topbar />

            <DashboardCards />

            <TableManagement />

            <ReservationManagement />

        </>

    );

}

export default AdminDashboard;