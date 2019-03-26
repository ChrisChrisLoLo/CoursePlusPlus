import React, { Component } from "react";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavbarComp from "./components/NavbarComp.js";

import HomePage from "./components/pages/HomePage.js";
import AuthPage from "./components/auth/index.js";
import SearchPage from "./components/search/index.js";
import ScheduleBuilderPage from "./components/scheduleBuilder/index.js";
import NotFoundErrPage from "./components/pages/NotFoundErrPage.js";



//import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <NavbarComp />
            <Container fluid={true}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/search" component={SearchPage} />
                <Route path="/scheduleBuilder" component={ScheduleBuilderPage} />
                <Route path="/auth" component={AuthPage} />
                <Route component={NotFoundErrPage} />
              </Switch>
            </Container>
          </div>
        </Router>
      </div >
    );
  }
}

export default App;
