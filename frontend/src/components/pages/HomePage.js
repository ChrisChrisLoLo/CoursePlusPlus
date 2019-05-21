import React from "react";
import {
  Row,
  Col
} from "reactstrap";
import "./styles/homePage.scss";
import Container from "reactstrap/es/Container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default class HomePage extends React.Component {
  render() {
    return (
      <div>

        <Row>
          <Col className={"px-0"}>
            <section className={"bgimage"}>
              <Container>
                <Row>
                  <Col></Col>
                  <Col lg={"10"} md={"10"} sm={"10"} xs={"10"} className={"text-center text-white"}>
                    <h1 className={"font-title"}>UCourse Builder</h1>
                    <p className={"mb-2"}>An unofficial University of Alberta app</p>
                    <p>Schedule building, refined</p>
                  </Col>
                  <Col></Col>
                </Row>
              </Container>
            </section>
          </Col>
        </Row>

        <Row className={"bg-primary text-light py-4"}>
          <Col xs={2} sm={2} md={3}>
          </Col>
          <Col>
            <h3 className={"font-title"}>Catchy phrase here</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Col>
          <Col xs={2} sm={2} md={3}>
          </Col>
        </Row>

        <Row className={"bg-light py-4"}>
          <Col>
            <Container>
              <Row>
                <Col lg={"3"} md={"6"} className={"mb-5 mb-lg-0 text-center"}>
                  <h5>Search for Courses</h5>
                  <FontAwesomeIcon icon={"search"} size={"3x"}/>
                </Col>
                <Col lg={"3"} md={"6"} className={"mb-5 mb-lg-0 text-center"}>
                  <h5>Make a Schedule</h5>
                  <FontAwesomeIcon icon={"calendar-alt"} size={"3x"}/>

                </Col>
                <Col lg={"3"} md={"6"} className={"mb-5 mb-lg-0 text-center"}>
                  <h5>Mix it Up</h5>
                  <FontAwesomeIcon icon={"random"} size={"3x"}/>

                </Col>
                <Col lg={"3"} md={"6"} className={"mb-5 mb-lg-0 text-center"}>
                  <h5>Beartracks Compatible</h5>
                  <FontAwesomeIcon icon={"paw"} size={"3x"}/>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

      </div>
    );
  }
}