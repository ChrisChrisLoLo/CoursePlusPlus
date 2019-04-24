import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
} from 'reactstrap';
import CartItem from "./CartItem";

import axios from "axios";
import getAuthToken from "../../../userLib/getAuthToken";


export default class ClassCart extends React.Component {
    constructor(props) {
        super(props);
        this.state={coursesInCart:[]};
    }

    componentDidMount() {
    //const queryRegex = new RegExp("[?].*");
    //const queryParams = window.location.href.match(queryRegex) || "";
    console.log(process.env);
    axios.get(process.env.REACT_APP_API_URL + "/api/classCart/",{
            headers:{Authorization:getAuthToken()}
        }).then(res => {
            const coursesData = res.data;
            this.setState({ coursesInCart: coursesData });
        })
	}

    render() {
        const results = this.state.coursesInCart.results;
        const cart = results ?
            results.map((course) =>
                <CartItem id={course.id} course={course}/>
            ):
            <p>No Results Found</p>;

        return (
            <Card>
                <CardHeader><h5>Selected Courses:</h5></CardHeader>
                <CardBody>
                    {cart}
                </CardBody>
            </Card>
        );
    }
}