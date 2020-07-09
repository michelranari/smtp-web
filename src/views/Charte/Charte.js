import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import APIRequest from '../../services/APIRequest';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider
} from '@material-ui/core';


class Charte extends Component{
  constructor(props){
    super(props);
    this.handleGetCharte = this.handleGetCharte.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state={
      text : ""
    }
  }

  async componentDidMount(){
    await APIRequest.get("/chartes",this.handleGetCharte,true);
  }

  // handle request
  handleGetCharte(status,data){
    this.setState({text : data.text})
  }


  handleTextChange(event){
    this.setState({text: event.target.value});
  }

  // Submit form
  async handleSubmit(){
    let text = this.state.text;
    if(text === ""){
      alert("Veuillez remplir le champ");
    }
    let data = { text : this.state.text};
    await APIRequest.patch("/chartes",data,this.handleResponseSubmit,true);
  }

  // handle response response after submit
  handleResponseSubmit(status){
    if(status === 204){
      alert("La charte a bien été modifié");
    }
  }

  render(){
    const { classes } = this.props;
    return (
      <Card
        className={clsx(classes.root, this.className)}
      >
        <CardHeader
          title="Charte"
        />
        <Divider />
        <CardContent className={classes.content}>
          <div className={classes.chartContainer}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={20}
              onChange={this.handleTextChange}
              variant="outlined"
              fullWidth
              value={this.state.text}
            />
            <CardActions className={classes.actions}>
              <Button style={{justifyContent: 'center'}} variant="contained" color="primary" onClick={this.handleSubmit}>
                Modifier
              </Button>
            </CardActions>
          </div>
        </CardContent>
      </Card>
    );
  }
}

const styles = theme => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
});

Charte.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Charte);
