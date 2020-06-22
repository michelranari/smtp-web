import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import APIRequest from './Services/APIRequest';


export default class Charte extends Component{
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

  // chart form
  form(){
    return (
      <Box display="flex" justifyContent="center" flexDirection="column" m={1} p={1}>
        <Box p={1} >
          <TextField
            id="outlined-multiline-static"
            label="Charte"
            multiline
            rows={20}
            defaultValue="Default Value"
            onChange={this.handleTextChange}
            variant="outlined"
            fullWidth="true"
            value={this.state.text}
          />
        </Box>
        <Box p={1} >
        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
          Modifier
        </Button>
        </Box>
    </Box>
    );
  }

  render(){
    return (
      this.form()
    );
  }
}
