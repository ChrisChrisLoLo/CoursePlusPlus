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
                                        <h1>UCourse Builder</h1>
                                        <p>An unofficial University of Alberta app</p>
                                        <p>Schedule building, refined</p>
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Container>
						</section>
					</Col>
				</Row>
				<Row>
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