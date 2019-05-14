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
    this.state = {classCartMap:{}};
    this.addClassCartToMap = this.addClassCartToMap.bind(this);
    this.removeClassCartFromMap = this.removeClassCartFromMap.bind(this);

  }

  addClassCartToMap(e,classCartId){
    this.setState({classCartMap:{...this.state.classCartMap, [classCartId]:true}});
  }

  removeClassCartFromMap(e,classCartId){
    const newClassCartMap = {...this.state.classCartMap};
  }

  componentDidMount() {
    //Get all courseCarts associated to the user.
    //The request is made here to avoid multiple requests to check if a class is in the cart
    if (isAuthenticated()) {
      axios.get(process.env.REACT_APP_API_URL + "/api/classCart/", {
        headers: {Authorization: getAuthToken()}
      }).then((res) => {
        const classCartMap = {};
        if (res.data.results) {
          console.log(res.data.results);
          res.data.results.forEach((classCartItem) => {
            classCartMap[classCartItem.id] = true;
          })
        }
        this.setState({classCartMap: classCartMap});
      });
    }
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
          <ResultItem course={course} key={course.id} specificTerm={this.props.specificTerm}/>
        );
      }
    } else {
      output = <Spinner style={{width: "3rem", height: "3rem", color: "primary"}}/>;
    }
    return (
      <div>
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
          <Row className="justify-content-between">
            <Col sm={{size: "auto"}}>
              {data.previous &&
              <Button color="primary" onClick={() => {
                this.props.changePaginationURL(data.previous)
              }}>Prev</Button>
              }
            </Col>
            <Col sm={{size: "auto"}}>
              {data.next &&
              <Button color="primary" onClick={() => {
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

