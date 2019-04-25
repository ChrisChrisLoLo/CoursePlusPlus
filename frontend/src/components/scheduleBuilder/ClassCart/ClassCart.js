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

    componentDidMount() {
        //const queryRegex = new RegExp("[?].*");
        //const queryParams = window.location.href.match(queryRegex) || "";
        axios.get(process.env.REACT_APP_API_URL + "/api/classCart/",{
                headers:{Authorization:getAuthToken()}
            }).then(res => {

                let classCart = res.data.results;

                this.mapRelatedData(classCart,"courseClass","/api/classes/?id=");

                //coursesData = this.mapRelatedClasstimes(coursesData)

                //Need to wait until all requests are done
                this.setState({ classesInCart: classCart });
                console.log(this.state.classesInCart);
            })
	}

	//Map related to an array of items. Mutates data.
	mapRelatedData(item,relatedName,relatedURL){
        const promises = [];

        if(Array.isArray(item)){
            item.forEach(item=>{
               promises.push(
                    axios.get(process.env.REACT_APP_API_URL + relatedURL + item[relatedName])
                        .then(res => {item[relatedName] = res.data.results})
               )
            });
            Promise.all(promises);
        }
        else{
            axios.get(process.env.REACT_APP_API_URL + relatedURL + item[relatedName])
                        .then(res => {item[relatedName] = res.data.results})
        }
    }

	mapRelatedClasstimes(classCartData) {
        const promises = [];

        //Mutate the classs data to have classtimes attached
        classCartData.results.forEach(classCart=>{
            promises.push(
                axios.get(process.env.REACT_APP_API_URL + "/api/classtimes/?courseClass=" +classCart.courseClass.id)
                    .then(res => {classCart.courseClass.classtimes = res.data.results})
            );
        });

        //Wait until all promises have been settled
        Promise.all(promises);

        return classCartData;
    }

    render() {
        const results = this.state.classesInCart.results;
        const cart = results ?
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