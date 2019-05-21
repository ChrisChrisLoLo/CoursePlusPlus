import React from "react";

export default class LogoutPage extends React.Component {

  componentWillMount() {
    document.cookie = "accessToken= ;expires = Thu, 01 Jan 1970 00:00:00 GMT";
    this.props.history.push("/");
  }

  render() {
    return null;
  }
}