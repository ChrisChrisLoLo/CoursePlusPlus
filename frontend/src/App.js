import React, { Component } from "react";
import { Container } from "reactstrap";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NavbarComp from "./components/NavbarComp";

import HomePage from "./components/pages/HomePage";
import AuthPage from "./components/auth/index";
import SearchPage from "./components/search/index";
import ScheduleBuilderPage from "./components/scheduleBuilder";
import NotFoundErrPage from "./components/pages/NotFoundErrPage";

import isAuthenticated from "./userLib/isAuthenticated";

//Import FA icons
import { library } from '@fortawesome/fontawesome-svg-core'
import {faChevronUp,faChevronDown} from "@fortawesome/free-solid-svg-icons";
library.add(faChevronUp,faChevronDown);
//




//import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <NavbarComp />
            <Container fluid={true}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/search" component={SearchPage} />
                <Route path="/scheduleBuilder" render={()=>{
                  return isAuthenticated() === true ?
                  <ScheduleBuilderPage /> :
                  <Redirect to={{pathname:"/auth", state:{redirectReason:"Please log in to use the schedule builder"}}} />;
                }}/>
                <Route path="/auth" component={AuthPage} />
                <Route component={NotFoundErrPage} />
              </Switch>
            </Container>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
