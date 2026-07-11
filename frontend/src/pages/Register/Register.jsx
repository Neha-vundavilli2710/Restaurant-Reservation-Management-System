import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";

import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

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
        setMessage("");

        const { name, email, password, confirmPassword } = formData;

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill all fields.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {

            setLoading(true);

            const response = await api.post("/auth/register", {
                name,
                email,
                password
            });

            setMessage(response.data.message);

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        }
        catch (err) {

            setError(
                err.response?.data?.message ||
                "Registration failed."
            );

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <section className="register-page">

            <div className="container">

                <div className="register-card">

                    <h1>Create Your Account</h1>

                    <p>
                        Join ReserveEase to reserve restaurant tables quickly
                        and manage your bookings with ease.
                    </p>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="success-message">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>Full Name</label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                            />

                        </div>

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

                        <div className="form-group">

                            <label>Confirm Password</label>

                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm password"
                            />

                        </div>

                        <button
                            type="submit"
                            className="register-btn"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Account"}
                        </button>

                    </form>

                    <div className="login-link">

                        Already have an account?

                        <Link to="/login">
                            Login
                        </Link>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Register;