import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Images from '../ImagesModule';

let pokemonCharc = {name: '', tags: [], imageName: null, properties: []};

class TableDialog extends React.Component {

  handleNameInput(event){
    pokemonCharc.name = event.target.value;
  }

  handleTagInput(event){
    pokemonCharc.tags = event.target.value.split(',');
  }

  handlePropertyInput(event){
    pokemonCharc.properties = event.target.value.split(',');
  }

  handleImageInput(event){
    pokemonCharc.imageName = event.target.value;
    this.props.handleImgSelectTD(event.target.value);
  }

  onAddPokemon = () => {
    if(pokemonCharc.name.length > 0){
      this.props.handleAddTDPokemon(pokemonCharc);
      pokemonCharc = {name: '', tags: [], imageName: null, properties: []};
    }else{
      this.props.handleCloseTableDialog();
      pokemonCharc = {name: '', tags: [], imageName: null, properties: []};
    }
  }


  render(){
    let imageArray = Object.keys(Images);
    return (
      <Dialog
        open={this.props.openTableDialog}
        onClose={this.props.handleCloseTableDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{textAlign:'center'}}>{"Add A New Pokemon !"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Note: The Pokemon must have a specified name, in order to be added. Separate all property and tag attributes 
            by a comma (try not to use spaces and, leave out unused commas).
          </DialogContentText>
          <form style={{width:'25ch', display:'inline'}}>
            <TextField 
              required id="standard-required" 
              label="Name" 
              defaultValue=""
              style={{marginLeft:"0.3em"}}
              onChange={this.handleNameInput}
            />
            <TextField 
              id="standard" 
              label="Tag(s)" 
              defaultValue="" 
              style={{marginLeft:"0.3em"}}
              onChange={this.handleTagInput}
            />
            <TextField
              id="Standard"
              label="Property"
              defaultValue=""
              style={{marginLeft:"0.3em"}}
              onChange={this.handlePropertyInput}
            />
          </form>
          <Select
            value={this.props.imgSelectOptTD}
            style={{marginLeft: '10em',width: '35%' , padding: '10px'}}
            onChange={this.handleImageInput.bind(this)}
          >
            {imageArray.map((img) => (
              <MenuItem key={`${img}`} value={img}>{img}</MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={this.onAddPokemon}
            style={{color: '#4BB543', borderColor: "#4BB543"}} 
            variant="outlined" 
          >
            Add Pokemon
          </Button>
          <Button onClick={this.props.handleCloseTableDialog} variant="outlined"  color="secondary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TableDialog;