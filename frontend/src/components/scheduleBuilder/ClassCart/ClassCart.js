import React from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';
import CartItem from "./CartItem";
import {Link} from "react-router-dom";

import axios from "axios";
import getAuthToken from "../../../userLib/getAuthToken";
import isAuthenticated from "../../../userLib/isAuthenticated";


export default class ClassCart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {classesInCart: [], page: 0};
    this.handlePageChange = this.handlePageChange.bind(this);
    this.loadClassCart = this.loadClassCart.bind(this);
  }

  componentDidUpdate(prevProps) {
    //update the classes based on the given term.
    if (this.props.chosenTerm !== prevProps.chosenTerm) {
      if (this.props.chosenTerm !== "") {
        if(isAuthenticated()){
          this.loadClassCart();
        }
        else{
          this.loadClassCartOffline();
        }
      }
    }
  }

  loadClassCart(){
    axios.get(process.env.REACT_APP_API_URL + "/api/classCart/?term=" + this.props.chosenTerm + "/", {
          headers: {Authorization: getAuthToken()}
        }).then((res) => {
          if (res.data.results !== this.state.classesInCart) {
            if (this.state.classesInCart !== res.data.results) {
              this.setState({classesInCart: res.data.results});

              //Read what courses are selected and update it
              const selectedCourses = [];
              this.state.classesInCart.forEach((el) => {
                if (el.isInSchedule === true) selectedCourses.push(el);
              });
              console.log(selectedCourses);
              this.props.setCoursesSelected(selectedCourses);
            }
          }
        });
  }

  loadClassCartOffline(){
    const dataResults = JSON.parse(localStorage.getItem("courseListData")) || [];
    // debugger;
    //Conditional prevents update looping
    if(this.state.classesInCart !== dataResults){
      this.setState({classesInCart: dataResults});

      //Read what courses are selected and update it
      const selectedCourses = [];
      dataResults.forEach((el) => {
        if (el.isInSchedule === true) selectedCourses.push(el);
      });
      console.log(selectedCourses);
      this.props.setCoursesSelected(selectedCourses);
    }
  }


  handlePageChange(e, increment) {
    this.setState({page: this.state.page + increment});
  }


  render() {
    const ITEMS_PER_PAGE = 5;
    const results = this.state.classesInCart;

    let cart;
    if (results && results.length > 0) {
      const paginatedResults = results.slice(this.state.page * ITEMS_PER_PAGE, (this.state.page * ITEMS_PER_PAGE) + ITEMS_PER_PAGE);
      cart = paginatedResults.map((classCart) => {
        const courseAdded = this.props.coursesSelected.includes(classCart);
        return (<CartItem
          key={classCart.id}
          classCart={classCart}
          courseAdded={courseAdded}
          handleCourseClassAdd={this.props.handleCourseClassAdd}
          handleCourseClassRemove={this.props.handleCourseClassRemove}
          setCoursePreviewed={this.props.setCoursePreviewed}
        />);
      });
    } else {
      cart = <p>No Results Found. Add classes from the <Link to={"/search"}>Search Page</Link> to use them in the schedule builder</p>;
    }

    let buttonGroup = null;
    if (results && results.length > 0) {
      buttonGroup = (<ButtonGroup>
        <Button
          size={"sm"}
          disabled={this.state.page <= 0}
          onClick={(e) => this.handlePageChange(e, -1)}
        >prev</Button>

        <Button
          size={"sm"}
          disabled={results.length - (this.state.page * ITEMS_PER_PAGE) < ITEMS_PER_PAGE}
          onClick={(e) => this.handlePageChange(e, 1)}
        >next</Button>
      </ButtonGroup>);
    }

    return (
      <Card>
        <CardHeader><h5 className={"font-title"} >Selected Courses:</h5></CardHeader>
        <CardBody className={"p-1"}>
          {cart}
          {buttonGroup}
        </CardBody>
      </Card>
    );
  }
}