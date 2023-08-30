import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Logo from "./images/w-logo.png";
import ProdImg from "./images/mdi_user.svg";
import ProdImg1 from "./images/Cart-white.svg";
import ProdImg2 from "./images/vec-white.svg";
import ProdImg3 from "./images/box-white.svg";


const Sidebar = () => {
  return (
    <Navbar  expand="xl" className="flex-xl-column">
      <Container>
        <Navbar.Brand className="mx-auto navbar-brand ">
          <img
            src={Logo}
            alt="Business Logo"
            height="50"
          />
        </Navbar.Brand>
      </Container>
      <Navbar.Toggle aria-controls="sidebar-nav" />
      <Navbar.Collapse id="sidebar-nav">
      <Nav className="flex-column mx-auto">
  <strong><Nav.Link href="./Products" className="custom-link active">
    <img src={ProdImg} alt="Products" />&nbsp;
    Products
  </Nav.Link>
  <Nav.Link href="#" ><img src={ProdImg1} alt="Products" />&nbsp;Orders</Nav.Link>
  <Nav.Link href="#" ><img src={ProdImg2} alt="Products" />&nbsp;Store</Nav.Link>
  <Nav.Link href="#" ><img src={ProdImg3} alt="Products" />&nbsp;Additive</Nav.Link>
  
  </strong>
</Nav>

      </Navbar.Collapse>
    </Navbar>
  );
};

export default Sidebar;
