import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!formData.email || !formData.password) {
            setError("Please fill all fields.");
            return;
        }

        try {

            setLoading(true);

            const response = await api.post("/auth/login", formData);

            login(
                response.data.user,
                response.data.token
            );

            if (response.data.user.role === "admin") {

                navigate("/admin");

            } else {

                navigate("/dashboard");

            }

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Login failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <section className="login-page">

            <div className="container">

                <div className="login-card">

                    <h1>Welcome Back</h1>

                    <p>
                        Login to ReserveEase and manage your restaurant reservations.
                    </p>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>Email Address</label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />

                        </div>

                        <div className="form-group">

                            <label>Password</label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                            />

                        </div>

                        <button
                            className="login-btn"
                            disabled={loading}
                        >
                            {loading ? "Logging In..." : "Login"}
                        </button>

                    </form>

                    <div className="register-link">

                        Don't have an account?

                        <Link to="/register">
                            Register
                        </Link>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Login;