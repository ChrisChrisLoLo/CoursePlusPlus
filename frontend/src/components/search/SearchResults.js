import React from "react";
import {
  Button,
  Row,
  Col,
  Container,
  Spinner,
} from 'reactstrap';

import ResultItem from "./ResultItem"
import isAuthenticated from "../../userLib/isAuthenticated";
import axios from "axios";
import getAuthToken from "../../userLib/getAuthToken";

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = { classCartMap : new Map() };
    this.addClassCartToMap = this.addClassCartToMap.bind(this);
    this.removeClassCartFromMap = this.removeClassCartFromMap.bind(this);
    this.checkFromMap = this.checkFromMap.bind(this);
    this.getFromMap = this.getFromMap.bind(this);
  }

  //The Class Cart Map keeps track of added courses so the app doesn't re-ask for added courseClasses
  addClassCartToMap(courseClassId,classCartId){
    //copy map since mutations are being performed
    const newMap = new Map(this.state.classCartMap);
    newMap.set(courseClassId,classCartId);
    this.setState({classCartMap:newMap});
  }

  removeClassCartFromMap(courseClassId){
    const newMap = new Map(this.state.classCartMap);
    newMap.delete(courseClassId);
    this.setState({classCartMap:newMap});
  }

  getFromMap(courseClassId){
    return this.state.classCartMap.get(courseClassId);
  }

  checkFromMap(courseClassId){
    return this.state.classCartMap.has(courseClassId);
  }

  componentDidMount() {
    this._mounted = true;
    //Get all courseCarts associated to the user.
    //The request is made here to avoid multiple requests to check if a class is in the cart
    if (isAuthenticated()) {
      axios.get(process.env.REACT_APP_API_URL + "/api/classCart/", {
        headers: {Authorization: getAuthToken()}
      }).then((res) => {
        const newClassCartMap = new Map();
        if (res.data.results) {
          res.data.results.forEach((classCartItem) => {
            newClassCartMap.set(classCartItem.courseClass.id,classCartItem.id);
          })
        }
        this.setState({classCartMap: newClassCartMap});
      });
    }
    else{
      //Unauthenticated mode - use local storage
      const newClassCartMap = new Map();
      const currClassCart = JSON.parse(localStorage.getItem("courseListData")) || [];

      currClassCart.forEach((classCartItem) => {
        //We set an arbitrary value of 1 to the classcart ID value of the map.
        //This can be done since there that value is only used for API requests,
        //which is not made in unauth mode.
        newClassCartMap.set(classCartItem.courseClass.id,1);
      });
      this.setState({classCartMap: newClassCartMap});
    }
  }

  componentWillUnmount() {
    //Do this to prevent a callback firing when the component is unmounted.
    //This supposedly prevents memory leaks.
    this._mounted = false;
  }

  render() {

    let results;
    let output;
    let data = this.props.courseListData;
    if (data) {
      results = data.results;

      //If empty
      if (results === undefined || results.length === 0) {
        output = <h3>No Results Found.</h3>
      } else {
        output = results.map((course) =>
          <ResultItem
            course={course}
            key={course.id}
            specificTerm={this.props.specificTerm}
            addClassCartToMap={this.addClassCartToMap}
            removeClassCartFromMap={this.removeClassCartFromMap}
            checkFromMap={this.checkFromMap}
            getFromMap={this.getFromMap}
          />
        );
      }
    } else {
      output = <Spinner style={{width: "3rem", height: "3rem", color: "primary"}}/>;
    }
    return (
      <div ref={this.props.refProp}>
        <Container fluid={true}>
          {data &&
          <Row className="justify-content-between">
            <Col sm={{size: "auto"}}>
            </Col>
            <Col sm={{size: "auto"}}>
              <p>{data.count} Results Found</p>
            </Col>
          </Row>
          }

          {output}

          {data &&
          <Row>
            <Col>
              {data.previous &&
              <Button color="primary" className={"float-left"} onClick={() => {
                this.props.changePaginationURL(data.previous)
              }}>Prev</Button>
              }
              {data.next &&
              <Button color="primary" className={"float-right"} onClick={() => {
                this.props.changePaginationURL(data.next)
              }}>Next</Button>
              }
            </Col>
          </Row>
          }
        </Container>
      </div>
    );
  }
}

