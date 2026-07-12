import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CustomerDashboard from "../pages/CustomerDashboard/CustomerDashboard";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import NotFound from "../pages/NotFound/NotFound";

import ProtectedRoute from "../routes/ProtectedRoute";

const AppRouter = () => {

    return (

        <Routes>

            {/* Public Pages */}

            <Route element={<MainLayout />}>

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
                    element={

                        <ProtectedRoute role="customer">

                            <CustomerDashboard />

                        </ProtectedRoute>

                    }
                />

            </Route>

            {/* Admin */}

            <Route element={<AdminLayout />}>

                <Route
                    path="/admin"
                    element={

                        <ProtectedRoute role="admin">

                            <AdminDashboard />

                        </ProtectedRoute>

                    }
                />

            </Route>

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

};

export default AppRouter;