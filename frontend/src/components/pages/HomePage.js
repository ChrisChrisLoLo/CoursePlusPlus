import React from "react";
import {
  Row,
  Col
} from "reactstrap";
import "./styles/homePage.scss";
import Container from "reactstrap/es/Container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReact,faPython,faSass,faUbuntu,faAws,faBootstrap,faJs} from "@fortawesome/free-brands-svg-icons";

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
                    <p>Build a schedule faster than ever before</p>
                  </Col>
                  <Col></Col>
                </Row>
              </Container>
            </section>
          </Col>
        </Row>

        <Row className={"bg-gradient text-light py-4"}>
          <Col xs={2} sm={2} md={3}>
          </Col>
          <Col>
            <h3 className={"font-title"}>A Modern Upgrade</h3>
            <p>
              Building a course schedule is now fast and fun.
              With UX and performance in mind, this application seeks to fix many of the flaws of
              the current system, while still maintaining compatibility.
            </p>
          </Col>
          <Col xs={2} sm={2} md={3}>
          </Col>
        </Row>

        <Row className={"bg-light pt-4"}>
          <Col xs={1} sm={1} md={2}>
          </Col>
          <Col>
            <Container>
              <Row>
                <Col lg={"3"} md={"6"} className={"mb-5 mb-lg-0 text-center"}>
                  <FontAwesomeIcon icon={"search"} size={"3x"}/>
                  <h5 className={"font-title"}>Search for Courses</h5>
                  <p className={"small"}>
                    Searching for courses now gives results in one second, not ten.
                    Just punch in your criteria and get the results you want.
                  </p>
                </Col>

                <Col lg={"3"} md={"6"} className={"mb-5 mb-lg-0 text-center"}>
                  <FontAwesomeIcon icon={"calendar-alt"} size={"3x"}/>
                  <h5 className={"font-title"}>Make a Schedule</h5>
                  <p className={"small"}>
                    Build your schedule for any upcoming term, all on a single page.
                    Better yet, the new schedule grid is mobile friendly.
                  </p>
                </Col>

                <Col lg={"3"} md={"6"} className={"mb-5 mb-lg-0 text-center"}>
                  <FontAwesomeIcon icon={"random"} size={"3x"}/>
                  <h5 className={"font-title"}>Mix it Up</h5>
                  <p className={"small"}>
                    With the new cart system, it's easier than ever to swap any courses around.
                    Change out any class you want with the press of a button.
                  </p>
                </Col>

                <Col lg={"3"} md={"6"} className={"mb-5 mb-lg-0 text-center"}>
                  <FontAwesomeIcon icon={"paw"} size={"3x"}/>
                  <h5 className={"font-title"}>Beartracks Compatible</h5>
                  <p className={"small"}>
                    Once finalized, copy the ID of each class directly into Beartracks,
                    allowing you to officially register without the official hassle.
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs={1} sm={1} md={2}>
          </Col>
        </Row>

        <Row className={"bg-light pt-4"}>
          <Col xs={2} sm={2} md={3}>
          </Col>
          <Col>
            <h3 className={"font-title"}>Fix Where Broken</h3>
            <p>
              Many annoyances that comes with using Beartracks has been fixed.
              The back button can now be used predictably, the app won't sign out after 30 minutes,
              and you can now have more than one window of this application open.
            </p>
          </Col>
          <Col xs={2} sm={2} md={3}>
          </Col>
        </Row>

        <Row className={"bg-light pt-4"}>
          <Col xs={2} sm={2} md={3}>
          </Col>
          <Col>
            <h3 className={"font-title"}>Improve Where Needed</h3>
            <p>
              The workflow of adding and swapping around courses have been tuned to be more intuitive and convenient.
              The site is now friendlier on mobile and simpler to use.
              Great efforts have also been made to make this application accessible to anyone who wishes to use it,
              having features such as a guest mode, as well as authentication via Google.
            </p>
          </Col>
          <Col xs={2} sm={2} md={3}>
          </Col>
        </Row>

        <Row className={"bg-light py-4"}>
          <Col xs={2} sm={2} md={3}>
          </Col>
          <Col>
            <h3 className={"font-title"}>Expand Where Desired</h3>
            <p>
              This application can further be expanded to include a plethora of new features, such as full mobile support,
              automated database scraping, and progressive web app support.
              Anyone who wishes to add any new features can submit a PR on <a href={"https://github.com/ChrisChrisLoLo/CoursePlusPlus"} target={"_blank"}>github</a>.
            </p>
          </Col>
          <Col xs={2} sm={2} md={3}>
          </Col>
        </Row>

        <Row className={"bg-secondary text-light py-3"}>
          <Col xs={1} sm={1} md={2}>
          </Col>
          <Col>
            <h4 className={"font-title text-center"}>Powered by the following technologies:</h4>
            <div className={"d-flex justify-content-between mt-3"}>
              <FontAwesomeIcon icon={faReact} size={"2x"}/>
              <FontAwesomeIcon icon={faPython} size={"2x"}/>
              <FontAwesomeIcon icon={faSass} size={"2x"}/>
              {/*<FontAwesomeIcon icon={faCss3} size={"2x"}/>*/}
              <FontAwesomeIcon icon={faUbuntu} size={"2x"}/>
              <FontAwesomeIcon icon={faAws} size={"2x"}/>
              {/*<FontAwesomeIcon icon={faHtml5} size={"2x"}/>*/}
              <FontAwesomeIcon icon={faBootstrap} size={"2x"}/>
              <FontAwesomeIcon icon={faJs} size={"2x"}/>
            </div>
          </Col>
          <Col xs={1} sm={1} md={2}>
          </Col>
        </Row>

        <Row className={"bg-dark text-light py-4"}>
          <Col xs={1} sm={1} md={2}>
          </Col>
          <Col>
            <p>App by <a href={"https://github.com/ChrisChrisLoLo/CoursePlusPlus"} target={"_blank"}>Christian Lo</a></p>
            <p>Noppyright 2019</p>
          </Col>
          <Col xs={1} sm={1} md={2}>
          </Col>
        </Row>
      </div>
    );
  }
}