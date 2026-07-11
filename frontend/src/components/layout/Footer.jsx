import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="container footer-container">

                <div className="footer-left">
                    <h2 className="footer-logo">ReserveEase</h2>
                    <p>Restaurant Reservation Management System</p>
                </div>

                <div className="footer-links">
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>

            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()} ReserveEase. All Rights Reserved.
            </div>

        </footer>
    );
};

export default Footer;