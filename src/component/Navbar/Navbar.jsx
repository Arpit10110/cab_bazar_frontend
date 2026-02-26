
import React from "react";
import logo from "/image/logo1.jpg";
import { Navbar, Container } from "react-bootstrap";
import "./Navbar.css";

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" className="custom-navbar" fixed="top">
      <Container>
        <Navbar.Brand href="/">
            
<img
  src={logo}
  alt="Logo"
  className="logo-img"
/>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;