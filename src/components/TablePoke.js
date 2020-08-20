import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AttachmentIcon from '@material-ui/icons/Attachment';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';


function rowNumberConverter(array){
  var rowNumberArray = [];
  const arrayLength = array.length;
  var x;
  for(x = 0; x<arrayLength; x++){
    rowNumberArray[x] = {rowNumb: x, ...array[x]}
  }
  return rowNumberArray;
}


class TablePoke extends React.Component{

  render() {

    
    if (this.props.viewOption !== 'Table View'){
      return null;
    }

    var rows = rowNumberConverter(this.props.rows);
    
    return(
      <>
        <TableContainer component={Paper}>
          <Table style={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{color: 'grey', fontSize: 25}}>
                    <Icon component={TextFormatIcon} style={{paddingRight:'0.2em'}}/>
                    Name
                </TableCell>
                <TableCell style={{color: 'grey', fontSize: 25}}>
                    <Icon component={FormatListBulletedIcon} style={{paddingRight:'0.2em'}}/>
                    Tags
                </TableCell>
                <TableCell style={{color: 'grey', fontSize: 25}}>
                    <Icon component={AttachmentIcon} style={{paddingRight:'0.2em'}}/>
                    Image
                </TableCell>
                <TableCell style={{color: 'grey', fontSize: 25}}>
                    <Icon component={FormatAlignLeftIcon} style={{paddingRight:'0.2em'}}/>
                    Property
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={`${row.name} , ${row.tags}`}>
                  <TableCell 
                    component="th" scope="row" 
                    style={{ fontSize: 20, textDecorationLine: "underline"}} 
                    onClick={() => this.props.handleEditTableDialog(row)}
                  >
                    <img 
                      src={(row.imageName) ? row.imageName : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs'} 
                      alt={`${row.name} Img `} height={30} width={40} 
                    />
                    {row.name}
                  </TableCell>
                  <TableCell align="left">
                    {(row.tags.length>1)? row.tags.map((tag, tagColor) => ( 
                      <Button 
                        key={`${row.name} ${tag}`} 
                        variant="outlined" 
                        color={(!tagColor) ? "primary" : "secondary"} 
                        style={{marginLeft:"0.3em"}}
                      >
                        {tag}
                      </Button> 
                    )): 
                      <Button
                        key={`${row.name} ${row.tags}`} 
                        variant="outlined" 
                        color="primary"
                        style={{marginLeft:"0.3em"}}
                      >
                        {row.tags}
                      </Button>
                    }
                  </TableCell>
                  <TableCell>
                    <img 
                      src={(row.imageName) ? row.imageName : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs'} 
                      alt={`${row.name} Img `} height={35} width={50}
                    />
                  </TableCell>
                  <TableCell>
                    {row.properties.map((property, tagColor) => (
                      <Button 
                        key={`${row.name} ${property}`} 
                        variant="outlined" 
                        color={(!tagColor) ? "default" : "primary"} 
                        style={{marginLeft:"0.3em"}}
                      >
                        {property}
                      </Button>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow key="generate row">
                <TableCell
                  component="th" scope="row"
                  style={{ fontSize: 25, color: 'grey' }}
                  onClick={this.props.handleTableDialog}
                >
                  <Icon component={AddCircleOutlineIcon} style={{paddingRight:"0.5em"}} />
                  New
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{display:'inline'}}>
          <h3 style={{marginLeft:'10em'}}>Count: &nbsp;&nbsp;{rows.length}</h3>
        </div>
      </>
    );
  }  
}

export default TablePoke;
