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
        this.state={classesInCart:[]};
    }

    componentDidUpdate(prevProps) {
        if (this.props.chosenTerm !== prevProps.chosenTerm){
            if(this.props.chosenTerm !== "" ) {
                axios.get(process.env.REACT_APP_API_URL + "/api/classCart/?term=" + this.props.chosenTerm + "/", {
                    headers: {Authorization: getAuthToken()}
                }).then((res) => {
                    if (res.data.results !== this.state.classesInCart) {
                        if(this.state.classesInCart !== res.data.results){
                            this.setState({classesInCart: res.data.results});
                        }
                    }
                });
            }
        }
    }


    render() {

        const results = this.state.classesInCart;
        console.log(results);
        const cart = results.length>0?
            results.map((classCart) =>
                <CartItem
                    key={classCart.id}
                    course={classCart.courseClass}
                    handleCourseClassAdd = {this.props.handleCourseClassAdd}
                    handleCourseClassRemove = {this.props.handleCourseClassRemove}
                />
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