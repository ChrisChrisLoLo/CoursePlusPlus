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
            }).then(async res => {

                let classCart = res.data.results;

                await this.mapForeignKey(classCart,"courseClass","/api/classes/").then((res)=>{console.log(res);classCart = res});
                console.log(classCart);
                //this.mapRelatedData(class)
                classCart.forEach((classCartItem)=>{
                    console.log(classCartItem);
                    console.log(classCartItem.courseClass);
                    console.log(classCartItem.fk);
                    classCartItem.courseClass = this.mapPrimaryKey(classCartItem.courseClass, "classtime","/api/classtimes/?courseClass=")
                });
                //coursesData = this.mapRelatedClasstimes(coursesData)

                //Need to wait until all requests are done
                this.setState({ classesInCart: classCart });
                console.log(this.state.classesInCart);
            })
	}

	//Takes a primary key of an object, uses it to get related data, and adds related data as an array to the object
	mapPrimaryKey(itemToMap,targetPropertyName,resourceURL){
        const promises = [];

        if(Array.isArray(itemToMap)){
            itemToMap.forEach(item=>{
               promises.push(
                    axios.get(process.env.REACT_APP_API_URL + resourceURL + item.id + "/")
                        .then(res => {item[targetPropertyName] = res.data})
               )
            });
            //Wait until all promises have been settled
            Promise.all(promises).then(()=>{return itemToMap});
        }
        else{
            axios.get(process.env.REACT_APP_API_URL + resourceURL + itemToMap.id + "/")
                .then(res => {itemToMap[targetPropertyName] = res.data;
                    return itemToMap})
        }
        // console.log(itemToMap)
        // return itemToMap
    }

    //Maps an foreign key property on an object into the resource of that ID
    async mapForeignKey(itemToMap,fk,resourceURL){
        const promises = [];

        if(Array.isArray(itemToMap)){
            console.log("ARRAAAAAAYYY")
            itemToMap.forEach(item=>{
               promises.push(
                    axios.get(process.env.REACT_APP_API_URL + resourceURL + item[fk] + "/")
                        .then(res => {item[fk] = res.data})
               )
            });
            //Wait until all promises have been settled
            // return await Promise.all(promises).then(()=>{console.log(itemToMap);return itemToMap});
            await Promise.all(promises);
            return Promise.resolve(itemToMap);
        }
        else{
            await axios.get(process.env.REACT_APP_API_URL + resourceURL + itemToMap[fk] + "/")
                        .then(res => {itemToMap[fk] = res.data;
                            return itemToMap});
        }

        // console.log(itemToMap)
        // return itemToMap
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