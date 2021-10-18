import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Header = ({ handleCurrency, currency }) => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={NavLink} to='/' exact>Crypto Analysis</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to='/' exact>Market</Nav.Link>
                            <Nav.Link as={NavLink} to='/exchange' exact>Exchange</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title={currency.toUpperCase()} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => handleCurrency('usd')}>USD</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleCurrency('bdt')}>BDT</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleCurrency('inr')}>INR</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleCurrency('eur')}>EUR</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
