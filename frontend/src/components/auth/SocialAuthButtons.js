import axios from "axios";
import React from "react";
import {GoogleLogin} from "react-google-login";


export default class SocialAuthButtons extends React.Component {
  constructor(props) {
    super(props);
    this.handleGoogleSuccess = this.handleGoogleSuccess.bind(this);
  }

  handleGoogleSuccess(res) {
    console.log(res.accessToken);
    axios.post(process.env.REACT_APP_API_URL + "/api/rest-auth/google/login/", {access_token: res.accessToken}, {
      headers: {Authorization: res.accessToken}
    }).then((res)=>{
      document.cookie = "accessToken=" + res.data.key;

      //console.log(cookieValue)
      this.props.history.push("/");
    });
  }

  render(){
    return(
      <React.Fragment>
        <GoogleLogin
            clientId="961272685707-aksmrtnilr44s1bpl2mhoncbbcila3up.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.handleGoogleSuccess}
            onFailure={(res) => console.warn(res)}
            cookiePolicy={'single_host_origin'}
        />
      </React.Fragment>
    );
  }


}