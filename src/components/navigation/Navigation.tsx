import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "../../styles/Navigation.css";

const Navigation: React.FC = () => {
    return (
        <Navbar id="navbar-container">
            <Container>
                <Navbar.Brand className="nav-brand">Credit Tracker</Navbar.Brand>

                <Nav className="me-auto">
                    <Nav.Link as={ Link } to="/" className="nav-link">Annual Plan</Nav.Link>
                    <Nav.Link as={ Link } to="/add" className="nav-link">Add Installment</Nav.Link>
                    <Nav.Link as={ Link } to="/euribor" className="nav-link">Euribor</Nav.Link>
                    <Nav.Link as={ Link } to="/calculate" className="nav-link">Calculate</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigation;