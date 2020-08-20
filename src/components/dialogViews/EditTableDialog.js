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
import LocateImage from '../helperFn/LocateImage';


let editPokeData = {name: '', tags: [], imageName: null, properties: []};

class EditTableDialog extends React.Component{
    
    handleNameEdit(event){
        editPokeData.name = (event.target.valie!==editPokeData.name) ? event.target.value: editPokeData.name;
    }

    handleTagEdit(event){
        editPokeData.tags = (event.target.value!==editPokeData.tags)? event.target.value.split(','): editPokeData.tags;
    }

    handlePropertyEdit(event){
        editPokeData.properties = (event.target.value!==editPokeData.properties)? event.target.value.split(','):editPokeData.properties;
    }

    handleImageEdit(event){
        editPokeData.imageName = (event.target.value!==editPokeData.imageName)?event.target.value : editPokeData.imageName;
        editPokeData.imageName = LocateImage(editPokeData.imageName);
        this.props.handleImgSelectETD(editPokeData.imageName);
    }

    onEditPokemon = () => {
        if(editPokeData.name.length > 0){
            this.props.handleEditTDPokemon(this.props.rows);
        }else{
            this.props.handleCloseEditTableDialog();
            editPokeData = {name: '', tags: [], imageName: null, properties: []}
        }
    }

    render(){
        var imageString = `${this.props.imgSelectEditTD}`;
        if(imageString.split('/').length > 2){
            imageString = imageString.split('/');
            imageString = imageString[3].split('.');
            imageString = imageString[0].charAt(0).toUpperCase() + imageString[0].slice(1);
        }
        let imageArray = Object.keys(Images);        
        const pokemonCharc = this.props.rows[this.props.editRowNum];
        editPokeData = pokemonCharc;
        
        if(pokemonCharc){
            return (
                <Dialog
                    open={this.props.openEditTableDialog}
                    onClose={this.props.handleCloseEditTableDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{textAlign:'center'}}>{`Edit An Existing Pokemon: ${pokemonCharc.name} !`}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Note: Change(s) made to image type will be reflected on the app (before you even
                        submit your edits). Name cannot be empty and make sure you leave out blank
                        spaces and unused commas for tag and property attributes.
                    </DialogContentText>
                    <form style={{width:'25ch', display:'inline'}}>
                        <TextField 
                            required id="standard1" 
                            label="Name" 
                            defaultValue={`${pokemonCharc.name}`}
                            style={{marginLeft:"0.3em"}}
                            onChange={this.handleNameEdit}
                        />
                        <TextField 
                            id="standard" 
                            label="Tag(s)" 
                            defaultValue={pokemonCharc.tags.join()}
                            style={{marginLeft:"0.3em"}}
                            onChange={this.handleTagEdit}
                        />
                        <TextField
                            id="Standard"
                            label="Property"
                            defaultValue={pokemonCharc.properties.join()}
                            style={{marginLeft:"0.3em"}}
                            onChange={this.handlePropertyEdit}
                        />
                    </form>
                    <Select
                        value={imageString}
                        style={{marginLeft: '10em',width: '35%' , padding: '10px'}}
                        onChange={this.handleImageEdit.bind(this)}
                    >
                        {imageArray.map((img) => (
                        <MenuItem key={`${img}`} value={img}>{img}</MenuItem>
                        ))}
                    </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={this.onEditPokemon}
                            style={{color: '#4BB543', borderColor: "#4BB543"}} 
                            variant="outlined" 
                        >
                            Edit Pokemon
                        </Button>
                        <Button onClick={this.props.handleCloseEditTableDialog} variant="outlined"  color="secondary" autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            );
        }
        return null;
      }
}

export default EditTableDialog;