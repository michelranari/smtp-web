import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import AddWorksite from './AddWorksite';
import axios from 'axios';



export default class UploadRoute extends Component {
  constructor(props){
    super(props);
    this.uploadFile = this.uploadFile.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.handleAddForm = this.handleAddForm.bind(this);
    this.fileData = this.fileData.bind(this);
    this.showAddWorkForm = this.showAddWorkForm.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleNom = this.handleNom.bind(this);
    this.handleAdresseCharg = this.handleAdresseCharg.bind(this);
    this.handleAdresseDech = this.handleAdresseDech.bind(this);
    this.handleLongCharg = this.handleLongCharg.bind(this);
    this.handleLatCharg = this.handleLatCharg.bind(this);
    this.handleLongDech = this.handleLongDech.bind(this);
    this.handleLatDech = this.handleLatDech.bind(this);
    this.createPlace = this.createPlace.bind(this);
    this.state={
      selectedFile: null,
      printAddWorkForm : false,
      nomChantier: "",
      adresseCharg: "",
      adresseDecharg: "",
      longCharg : "",
      latCharg : "",
      longDech : "",
      latDech : "",
    }
  }

  // add headers with token
  async uploadFile(){
    // // Create an object of formData
    // const formData = new FormData();
    //
    // // Update the formData object
    // formData.append(
    //   "myFile",
    //   this.state.selectedFile,
    //   this.state.selectedFile.name
    // );

    if(this.state.selectedFile){
      const token  = await localStorage.getItem('token');
      var data = null;
      await axios({
        method: 'post',
        url: "",
        data : data,
        headers: {'Authorization': 'Bearer ' + token},
      })
      .then((response) => {
        if(response.status != 200){
          console.log(response);
        }else{
          console.log(response.status);
          alert("le fichier a bien été ajouté");
        }
      })
        .catch(function (error) {
        console.log(error);
        alert("mail ou mot de passe erroner !");
      });
    }else{
      alert("Veuillez ajouter un fichier");
    }
  }

  onFileChange(event){
      this.setState({ selectedFile: event.target.files[0] });
    };

  fileData(){
    if (this.state.selectedFile) {
      return (
        <div>
          <p>Detail du fichier:<br />
            Nom du fichier: {this.state.selectedFile.name} <br />
            Type de fichier: {this.state.selectedFile.type}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <p>Choissisez un fichier avant d'appuyer sur le bouton "Upload!"</p>
        </div>
      );
    }
  };

  handleAddForm(){
    this.setState({printAddWorkForm : !this.state.printAddWorkForm});
  }

  handleNom(e){
    this.setState({nomChantier: e})
  }

  handleAdresseCharg(e){
    this.setState({adresseCharg: e})
  }

  handleAdresseDech(e){
    this.setState({adresseDecharg: e})
  }

  handleLongCharg(e){
    this.setState({longCharg: e})
  }

  handleLatCharg(e){
    this.setState({latCharg: e})
  }

  handleLongDech(e){
    this.setState({longDech: e})
  }

  handleLatDech(e){
    this.setState({latDech: e})
  }

  async createWorkSite(nom,charg,decharg){
    const token  = await localStorage.getItem('token');
    const data = {
                "nom": nom,
                "lieuChargementId": charg,
                "lieuDéchargementId": decharg,
            };
    axios({
        method: 'post',
        url: 'https://smtp-pi.herokuapp.com/chantiers',
        data : data,
        headers: {'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzAwNjY1LWY5ZmQtNGUzMC1hZTJlLTVlNTRjZjYzOGEzOCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU4OTYzODE0OH0.fJzkz2YYJEBmzvQeYWgYGRYprxXnvO6ET0v3w-WwzzU"},
    })
      .then( response => {
          if(response.status != 201){
              console.log(response.status);
              return response.status;
          }
          console.log(response.status);
          alert("!le chantier a bien été crée");
          return response.status;
      })
      .catch((error) => {
          console.log(error);
      })
  }

  async validateForm(){
    if(this.state.nomChantier == "" ||this.state.adresseCharg == "" || this.state.adresseDecharg == "" || this.state.longCharg == "" || this.state.latCharg == ""|| this.state.longDech == "" || this.state.latDech == ""){
      alert("Remplissez tous les champs")
    }else{
      const idChargement = await this.createPlace(this.state.adresseCharg,this.state.longCharg,this.state.latCharg);
      const idDechargement = await this.createPlace(this.state.adresseDecharg,this.state.longDech,this.state.latDech);
      await this.createWorkSite(this.state.nomChantier,idChargement,idDechargement);
    }
  }

  async createPlace(adresse,long,lat){
    const token  = await localStorage.getItem('token');
    const data = {
          "adresse": adresse,
          "longitude": parseFloat(long),
          "latitude": parseFloat(lat),
      };
      return axios({
              method: 'post',
              url: 'https://smtp-pi.herokuapp.com/lieux',
              data : data,
              headers: {'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzAwNjY1LWY5ZmQtNGUzMC1hZTJlLTVlNTRjZjYzOGEzOCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU4OTYzODE0OH0.fJzkz2YYJEBmzvQeYWgYGRYprxXnvO6ET0v3w-WwzzU"},
          })
            .then( response => {
                if(response.status != 201){
                    console.log(response.status);
                    alert(response.status);
                    return response.status;
                }
                console.log(response.status);
                return response.data.id;
            })
            .catch((error) => {
                alert(error);
                console.log(error.response);
            })
  }

  showAddWorkForm(){
    if(this.state.printAddWorkForm){
      return <AddWorksite nom={this.handleNom} adresseCharg={this.handleAdresseCharg}
        adresseDecharg={this.handleAdresseDech} longCharg={this.handleLongCharg} latCharg={this.handleLatCharg}
        longDech={this.handleLongDech} latDech={this.handleLatDech} validate={this.validateForm}/>
    }else{
      return null
    }
  }

  render() {
    return (
      <div>
        <h3>
          Uploader le fichier de routing :
        </h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.uploadFile}>
            Upload!
          </button>
        </div>
        {this.fileData()}
        <Button variant="contained" color="primary" onClick={this.handleAddForm}>
          AJOUTER UN CHANTIER
        </Button>
        {this.showAddWorkForm()}
      </div>
    )
  }

}
