import React from "react";
import {
    Row,
    Col
} from 'reactstrap';
export default class NotFoundErrPage extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <h1>No such page found.</h1>
                    </Col>
                </Row>
            </div>
        );
    }
}