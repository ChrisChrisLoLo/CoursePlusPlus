import React, { Component } from "react";
import logo from "./logo.svg";
//import "./App.css";
import NavbarComp from "./components/NavbarComp.js"
import { Container, Row, Col } from "reactstrap"


class App extends Component {
  render() {
    console.log(NavbarComp);
    return (
      <div>
        <head>
          <title>Hello, world!</title>
        </head>
        <body>
          <NavbarComp />
          <Container>
            <Row>
              <Col>
                <h1>UCourse</h1>
              </Col>
            </Row>
          </Container>
        </body>
      </div >
    );
  }
}

export default App;
