import React from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from "reactstrap";
import { NavLink } from "react-router-dom";
export default class Example extends React.Component {
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
				<Navbar color="light" light expand="md">
					<NavLink to="/" className="navbar-brand">UCourse+</NavLink>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink to="/search/" className="nav-link">Search</NavLink>
							</NavItem>
							<NavItem>
								<NavLink to="/scheduleBuilder/" className="nav-link">Schedule Builder</NavLink>
							</NavItem>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									Options
				  			</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem>
										Option 1
									</DropdownItem>
									<DropdownItem>
										Option 2
									</DropdownItem>
									<DropdownItem divider />
									<DropdownItem>
										Reset
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}