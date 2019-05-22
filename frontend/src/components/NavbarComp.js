import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap";
import {NavLink} from "react-router-dom";
import isAuthenticated from "../userLib/isAuthenticated";
import logo from "./../logo.png";


export default class NavbarComp extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md" fixed={"top"}>
          <NavLink to="/" className="navbar-brand font-title">
            <img src={logo} height="30" width="30" alt="Logo" className="d-inline-block mr-1"/>
            UCoursePlus
          </NavLink>

          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to="/search/" className="nav-link">Search</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/scheduleBuilder/" className="nav-link">Schedule Builder</NavLink>
              </NavItem>
              {isAuthenticated() ?
                <NavItem>
                  <NavLink to="/logout/" className="nav-link">Log Out</NavLink>
                </NavItem> :
                <NavItem>
                  <NavLink to="/auth/" className="nav-link">Log In</NavLink>
                </NavItem>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}