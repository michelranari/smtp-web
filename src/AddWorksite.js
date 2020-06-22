import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';

export default function AddWorksite(props) {
  return(
    <div>
      <h3>Ajout d'un chantier </h3>
      <MuiThemeProvider>
        <TextField
         hintText="Nom"
         floatingLabelText="Entrer le nom du chantier"
         onChange = {(event,newValue) => props.nom(newValue)}
        />
        <br />
        <h5>Lieu de Chargement</h5>
        <TextField
         hintText="Adresse"
         floatingLabelText="Adresse de lieu de chargement"
         onChange = {(event,newValue) =>  props.adresseCharg(newValue)}
        />
        <br />
        <TextField
         hintText="Longitude"
         floatingLabelText="Longitude du lieu"
         onChange = {(event,newValue) =>  props.longCharg(newValue)}
        />
        <br />
        <TextField
         hintText="Latitude"
         floatingLabelText="Latitude du lieu"
         onChange = {(event,newValue) =>  props.latCharg(newValue)}
        />
      <h5>Lieu de DéChargement</h5>
        <TextField
         hintText="Adresse"
         floatingLabelText="Adresse de lieu de déchargement"
         onChange = {(event,newValue) =>  props.adresseDecharg(newValue)}
        />
        <br />
        <TextField
         hintText="Longitude"
         floatingLabelText="Longitude du lieu"
         onChange = {(event,newValue) =>  props.longDech(newValue)}
        />
        <br />
        <TextField
         hintText="Latitude"
         floatingLabelText="Latitude du lieu"
         onChange = {(event,newValue) =>  props.latDech(newValue)}
        />
        <br />
        <Button variant="contained" color="primary" onClick={() => props.validate()}>
          Valider
        </Button>
      </MuiThemeProvider>
    </div>
  );
}
