import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import NavbarComp from "./components/NavbarComp.js"
import HomePage from "./components/pages/HomePage.js"
import NotFoundErrPage from "./components/pages/NotFoundErrPage.js"
import logo from "./logo.svg";

//import "./App.css";

class App extends Component {
  render() {
    console.log(NavbarComp);
    return (
      <div>
        <body>
          <Router>
            <div>
              <NavbarComp />
              <Container>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  {/* <Route path="/about" component={About} />
                    <Route path="/topics" component={Topics} /> */}
                  <Route component={NotFoundErrPage} />
                </Switch>
              </Container>
            </div>
          </Router>
        </body>
      </div >
    );
  }
}

export default App;
