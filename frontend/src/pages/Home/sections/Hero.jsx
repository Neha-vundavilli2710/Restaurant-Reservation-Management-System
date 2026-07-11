import { Link } from "react-router-dom";
import heroImage from "../../../assets/images/restaurant-hero.png";

const Hero = () => {
    return (
        <section className="hero">

            <div className="container hero-content">

                <div className="hero-text">

                    <h1>
                        Restaurant Reservation
                        <span> Management System</span>
                    </h1>

                    <p>
                        Reserve restaurant tables quickly and securely.
                        Customers can book tables online while administrators
                        efficiently manage reservations.
                    </p>

                    <Link
                        to="/register"
                        className="primary-btn"
                    >
                        Get Started
                    </Link>

                </div>

                <div className="hero-image">
                    <img
                        src={heroImage}
                        alt="Restaurant Reservation"
                    />
                </div>

            </div>

        </section>
    );
};

export default Hero;