import React from "react";
import {
    Col,
    Card,
    CardBody,
} from 'reactstrap';
export default class SearchForm extends React.Component {
    render() {
        return (
            <Col sm="2">
                <Card>
                    <CardBody>
                        <h5>Find a specific course:</h5>
                    </CardBody>
                </Card>
                {/*TODO: Make the bottom card sticky*/}
                <Card>
                    <CardBody>
                        <h5>Specific search:</h5>
                    </CardBody>
                </Card>
            </Col>

        );
    }
}