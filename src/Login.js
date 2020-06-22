import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import UploadRoute from './UploadRoute';
import APIRequest from './Services/APIRequest';

export default class Login extends Component {

  constructor(props){
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.handleResponseAuthenticate = this.handleResponseAuthenticate.bind(this);
    this.state={
      mail:'',
      password:'',
      redirect: false
    }
  }

  form(){
    return(
      <div>
        <MuiThemeProvider>
          <AppBar
             title="Connexion"
           />
          <TextField
           hintText="Entrer votre mail"
           floatingLabelText="Mail"
           onChange = {(event,newValue) => this.setState({mail:newValue})}
          />
          <br/>
          <TextField
            type="password"
            hintText="Entrez votre mot de passe"
            floatingLabelText="Mot de passe"
            onChange = {(event,newValue) => this.setState({password:newValue})}
          />
          <br/>
          <RaisedButton label="Valider" primary={true} style={style} onClick={(event) => this.formSubmit(event)}/>
        </MuiThemeProvider>
      </div>
    )
  }

  async formSubmit(event){
    if(this.state.mail === "" || this.state.password === ""){
      alert('Veuillez saisir tous les champs');
    }else{
      var data = {
        "mail": this.state.mail,
        "password": this.state.password,
      };
      await APIRequest.post("/admins/authenticate",data,this.handleResponseAuthenticate,this.handleErrorAuthenticate,false);
    }
  }

  // store token en userID in
  handleResponseAuthenticate(status,data){
    // if succes
    if(status === 200){
      localStorage.setItem('token',data.token);
      this.setState({ redirect: true });
      console.log("authentification succesful");
    // else
    }else{
      alert("Mail ou Mot de passe erroné !");
    }
  }

  render() {
    if (this.state.redirect) {
       return <Redirect to='/charte'/>;
     }
    return (this.form());
  }
}

const style = {
 margin: 15,
};
