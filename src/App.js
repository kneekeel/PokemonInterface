import React from 'react';
import NavBar from './components/NavBar';
import TablePoke from './components/TablePoke';
import TableDialog from './components/dialogViews/TableDialog';
import EditTableDialog from './components/dialogViews/EditTableDialog';
import Images from './components/ImagesModule';
import LocateImage from './components/helperFn/LocateImage';
import BoardView from './components/BoardView';
import GalleryView from './components/GalleryView';

import './css/App.css';


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        viewOption: 'Table View',
        imgSelectOptTD: null,
        imgSelectEditTD: null,
        data: [
          {name: 'Charizard-1', tags: ['Mean'], imageName: Images.Charizard, properties: ['Fire', 'Flying']},
          {name: 'Pikachu-1', tags: ['Cute'], imageName: Images.Pikachu, properties: ['Electric']},
          {name: 'Charmander-1', tags: ['Hot Headed'], imageName: Images.Charmander, properties: ['Fire','Fast']}
        ],
        openTableDialog: false,
        openEditTableDialog: false,
        editRowNum: null,
    }
  }

  handleViewOpt = (value) => {
    this.setState({viewOption : `${value}`});
  }

  handleTableDialog = () => {
    this.setState({openTableDialog: true, imgSelectOptTD: 'Pikachu'});
  }

  handleCloseTableDialog = () => {
    this.setState({openTableDialog: false});
  }

  handleImgSelectTD = (value) => {
    console.log(value);
    this.setState({imgSelectOptTD: value});
  }

  handleAddTDPokemon = (pokeData) => {
    pokeData.imageName = LocateImage(pokeData.imageName);
    this.setState({openTableDialog: false, data: [...this.state.data, pokeData]});
  }

  handleEditTableDialog = (row) => {
    this.setState({
      openEditTableDialog: true, 
      editRowNum: row.rowNumb, 
      imgSelectEditTD: row.imageName,
    });
  }

  handleCloseEditTableDialog = () => {
    this.setState({openEditTableDialog: false, editRowNum: null, imgSelectEditTD: null});
  }

  handleImgSelectETD = (value) => {
    console.log(value);
    this.setState({imgSelectEditTD: value});
  }

  handleEditTDPokemon = (pokeData) => {
    console.log(pokeData);
    this.setState({data: pokeData, editRowNum: null, imgSelectEditTD: null});
  } 

  handleTagChange = (srcCol, destCol, removed) => {
    var pokemonIdx = this.state.data.indexOf(removed);
    var oldTag = srcCol.name;
    var newTag = destCol.name;
    let newData = [...this.state.data];
    if(newData[pokemonIdx].tags.length > 1){
      var removedTagIdx = newData[pokemonIdx].tags.indexOf(oldTag);
      newData[pokemonIdx].tags[removedTagIdx] = newTag;
      this.setState({data:newData});
    }else{
      newData[pokemonIdx].tags = [newTag];
      this.setState({data: newData});
    }
  }

  render(){
    return(
      <>
        <div className="App">
          <header className="App-header">
            <h1>Pokemon</h1>
          </header>
          <NavBar 
            viewOption={this.state.viewOption} handleViewOpt={this.handleViewOpt.bind(this)}
            handleTableDialog={this.handleTableDialog.bind(this)}
          />
          <TablePoke 
            viewOption={this.state.viewOption} 
            rows={this.state.data} 
            handleTableDialog={this.handleTableDialog.bind(this)}
            handleEditTableDialog={this.handleEditTableDialog.bind(this)}    
          />
          <TableDialog 
            openTableDialog={this.state.openTableDialog} 
            handleCloseTableDialog={this.handleCloseTableDialog}
            imgSelectOptTD={this.state.imgSelectOptTD}
            handleImgSelectTD={this.handleImgSelectTD.bind(this)}
            handleAddTDPokemon={this.handleAddTDPokemon.bind(this)}
          />
          <EditTableDialog 
            openEditTableDialog={this.state.openEditTableDialog}
            handleCloseEditTableDialog={this.handleCloseEditTableDialog}
            editRowNum={this.state.editRowNum}
            imgSelectEditTD={this.state.imgSelectEditTD}
            rows={this.state.data}
            handleImgSelectETD={this.handleImgSelectETD.bind(this)}
            handleEditTDPokemon={this.handleEditTDPokemon.bind(this)}
          />
          <BoardView
            viewOption={this.state.viewOption}
            data={this.state.data}
            handleTagChange={this.handleTagChange.bind(this)}
          />
          <GalleryView 
            viewOption = {this.state.viewOption}
            data={this.state.data}
          />
        </div>
      </>
    );
  }
}


export default App;
