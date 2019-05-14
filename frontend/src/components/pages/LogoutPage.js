import React from "react";

export default class LogoutPage extends React.Component {

  componentWillMount() {
    document.cookie = "accessToken=;";
    this.props.history.push("/");
  }

  render() {
    return null
  }
}