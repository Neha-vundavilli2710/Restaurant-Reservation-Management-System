import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CustomerDashboard from "../pages/CustomerDashboard/CustomerDashboard";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import NotFound from "../pages/NotFound/NotFound";

const AppRouter = () => {

    return (

        <Routes>

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={<CustomerDashboard />}
            />

            <Route
                path="/admin"
                element={<AdminDashboard />}
            />

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

};

export default AppRouter;