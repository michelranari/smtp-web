import React, { Component } from 'react';
import { Link as RouterLink, withRouter, Redirect } from 'react-router-dom';
import APIRequest from '../../services/APIRequest';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

import {
  Grid,
  Button,
  TextField,
  Link,
  Typography
} from '@material-ui/core';

class SignIn extends Component{
  constructor(props){
    super(props);
    const { history } = this.props;
    this.formSubmit = this.formSubmit.bind(this);
    this.handleResponseAuthenticate = this.handleResponseAuthenticate.bind(this);
    this.handleMailChange = this.handleMailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state={
      isValid : false,
      touched : {},
      errors : {},
      mail:'',
      password:'',
      redirect: false
    }
  }

  async formSubmit(event){
    event.preventDefault();
    if(this.state.mail === "" || this.state.password === ""){
      alert('Veuillez saisir tous les champs');
    }else{
      var data = {
        "mail": this.state.mail,
        "password": this.state.password,
      };
      console.log(data);
      await APIRequest.post("/admins/authenticate",data,this.handleResponseAuthenticate,false);
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

  handleMailChange(event){
    this.setState({mail: event.target.value})
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value})
  }

  form(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
        >
          <Grid
            className={classes.content}
            item
            lg={7}
            xs={12}
          >
            <div className={classes.content}>

              <div className={classes.contentBody}>
                <form
                  className={classes.form}
                  onSubmit={this.formSubmit}
                >
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    Connexion
                  </Typography>
                  <TextField
                    className={classes.textField}
                    fullWidth
                    label="Email"
                    name="mail"
                    onChange={this.handleMailChange}
                    value={this.state.mail}
                    type="text"
                    variant="outlined"
                  />

                  <TextField
                    className={classes.textField}
                    fullWidth
                    label="Mot de passe"
                    name="password"
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                    type="password"
                    variant="outlined"
                  />
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Valider
                  </Button>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  render(){
    if (this.state.redirect) {
       return <Redirect to='/dashboard'/>;
     }
    return (this.form());
  }
}


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
});

SignIn.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SignIn));
