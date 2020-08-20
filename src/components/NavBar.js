import React from 'react';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import ViewWeekOutlinedIcon from '@material-ui/icons/ViewWeekOutlined';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import SearchIcon from '@material-ui/icons/Search';
import Icon from '@material-ui/core/Icon';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

import '../css/NavBar.css'


class NavBar extends React.Component{

    onViewChange(event) {
        this.props.handleViewOpt(event.target.value);
    }
    
    render(){
        let displayChoice;
        if (this.props.viewOption === 'Table View'){
            displayChoice = TableChartOutlinedIcon;
        }else if(this.props.viewOption === 'Board View'){
            displayChoice = ViewWeekOutlinedIcon;
        }else if(this.props.viewOption === 'Gallery View'){
            displayChoice = PhotoLibraryOutlinedIcon;
        }

        return(
            <div className="NavBar-header">
                <h2>
                    Pokemons
                </h2>
                <div className="NavBar-select">
                    <Icon style={{fontSize: 35}} component={displayChoice}/>
                    <Select 
                        value={this.props.viewOption}
                        style={{maxHeight: 20, fontSize: '130%', paddingLeft:'0.5em', paddingBottom:'0.2em'}}
                        onChange={this.onViewChange.bind(this)}
                    >
                        <MenuItem value="Table View">Table View</MenuItem>
                        <MenuItem value="Board View">Board View</MenuItem>
                        <MenuItem value="Gallery View">Gallery View</MenuItem>
                    </Select>
                    <SearchIcon style={{paddingLeft:'5em', fontSize:'110%'}}/>
                    <InputBase
                        placeholder="Search"
                        style={{fontSize:'100%'}}
                    />
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={this.props.handleTableDialog}
                    >
                        New
                    </Button>
                </div>
            </div>
        );
    }
}



export default NavBar;