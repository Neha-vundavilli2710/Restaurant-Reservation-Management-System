import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({

    children,

    role

}) {

    const {

        user,

        loading

    } = useAuth();

    if (loading) {

        return <h2>Loading...</h2>;

    }

    if (!user) {

        return <Navigate to="/login" replace />;

    }

    if (

        role &&

        user.role !== role

    ) {

        if (user.role === "admin") {

            return <Navigate to="/admin" replace />;

        }

        return <Navigate to="/dashboard" replace />;

    }

    return children;

}

export default ProtectedRoute;