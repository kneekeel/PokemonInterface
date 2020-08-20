import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class GalleryView extends React.Component{

    render(){
        if(this.props.viewOption!=='Gallery View'){
            return null;
        }

        var pokeData = this.props.data;

        return(
            <div style={{flexGrow:1}}>
                <Grid container spacing={3}>
                    {pokeData.map((data)=> (
                        <Grid item xs={3} style={{border: '1px solid black', marginTop:'1em'}} key={`${data.name}, ${data.tags}`}>
                            <Card style={{maxWidth:150, display:'inline'}} >
                                <CardActionArea>
                                    <CardMedia
                                        style={{height:250}}
                                        image={data.imageName}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {data.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }    
}

export default GalleryView;




