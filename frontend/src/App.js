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
import {faChevronUp,faChevronDown,faSearch,faCalendarAlt,faRandom,faPaw} from "@fortawesome/free-solid-svg-icons";
import {faWindowClose} from "@fortawesome/free-regular-svg-icons";

import LogoutPage from "./components/pages/LogoutPage";
library.add(faChevronUp,faChevronDown,faSearch,faCalendarAlt,faRandom,faPaw,faWindowClose);
//

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <NavbarComp />
            <Container fluid={true} className={"app-body"}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/search" component={SearchPage} />
                <Route path="/scheduleBuilder" component={ScheduleBuilderPage}/>
                <Route path="/auth" component={AuthPage} />
                <Route path="/logout" component={LogoutPage}/>
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
