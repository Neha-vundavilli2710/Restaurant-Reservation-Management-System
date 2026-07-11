import { NavLink } from "react-router-dom";

import "../../styles/layout/Navbar.css";

const Navbar = () => {

    return (

        <header className="navbar">

            <div className="container navbar-container">

                <h2 className="logo">
                    ReserveEase
                </h2>

                <nav>

                    <ul className="nav-links">

                        <li>

                            <NavLink to="/">
                                Home
                            </NavLink>

                        </li>

                        <li>

                            <NavLink to="/login">
                                Login
                            </NavLink>

                        </li>

                        <li>

                            <NavLink to="/register">
                                Register
                            </NavLink>

                        </li>

                    </ul>

                </nav>

            </div>

        </header>

    );

};

export default Navbar;