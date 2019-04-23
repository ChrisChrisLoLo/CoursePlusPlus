import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Form,
    FormGroup,
    Input,
} from 'reactstrap';
import axios from "axios";
import getAuthToken from "../../../userLib/getAuthToken";
export default class ClassCart extends React.Component {
    constructor(props) {
        super(props);
        this.state={coursesInCart:[],coursesSelected:[]};
    }

    componentDidMount() {
    //const queryRegex = new RegExp("[?].*");
    //const queryParams = window.location.href.match(queryRegex) || "";
    console.log(process.env);
    axios.get(process.env.REACT_APP_API_URL + "/api/classCart/",{
            headers:{Authorization:getAuthToken()}
        }).then(res => {
            const coursesData = res.data;
            this.setState({ courseListData: coursesData });
        })
	}


    render() {
        return (
            <Card>
                <CardHeader><h5>Selected Courses:</h5></CardHeader>
                <CardBody>


                </CardBody>
            </Card>
        );
    }
}