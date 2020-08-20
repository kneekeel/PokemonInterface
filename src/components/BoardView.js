import React, {useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function makeData(data){

    const uniqueTags = getUniqueTags(data);
    var x,y,z;
    var columns = {};

    for(x=0; x<data.length;x++){
        var pokeTags = data[x].tags
        for(y=0;y<uniqueTags.length;y++){
            for(z=0;z<pokeTags.length;z++){
                if(`${pokeTags[z]}`===uniqueTags[y]){
                    var columnName = `column-${y}`;
                    // if(!columns[columnName].items.length){
                    var column = makeColumn(columnName, uniqueTags[y], [data[x]]);
                    // }else{
                    //     column = makeColumn(columnName, uniqueTags[y], [...columns[columnName].items,data[x]]);
                    // }   
                    columns[columnName] = column;
                }
            }
        }
    }
    
    return columns;
}

function makeColumn(id, tagName, arr){
    return {id: id, name: tagName, items: arr};
}


function getUniqueTags(data){
    var unqTags = [];
    const dataLength = Object.keys(data).length;
    var x,y;
    var noTagOpt = false;
    for(x=0; x<dataLength; x++){
        var pokeTags = data[x].tags;
        if(pokeTags.length===0){
            if(!noTagOpt){
                unqTags.push('No Tags');
                noTagOpt = true;
            }
        }
        if(pokeTags.length > 1){
            for(y=0; y<pokeTags.length;y++){
                if(!(pokeTags[y] in unqTags)){
                    unqTags.push(pokeTags[y])
                }
            }
        }else if(!(pokeTags[0] in unqTags)){
            unqTags.push(pokeTags[0])
        }
    }
    return unqTags;
}

const onDragEnd = (result, columns, setColumns, props) => {
    if(!result.destination){
        return;
    }
    const { source, destination } = result;
    if(source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index,1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems,
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }  
        })
        props.handleTagChange(sourceColumn, destColumn, removed)
    }else{
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns, 
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        },)
    }
}

function BoardView(props) {

    var data = makeData(props.data);

    const [columns, setColumns] = useState(data);


    if(props.viewOption!=='Board View'){
        return null;    
    }
    
    return(
        <div style={{display:'flex', justifyContent:'center', height:'60%'}}>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns, props)}> 
                {Object.entries(columns).map(([id, column])=> {
                    return(
                        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}} key={id}>
                            <h2>{column.name}</h2>
                            <div style={{margin: 8}}>
                                <Droppable droppableId={id} key={id}>
                                    {(provided, snapshot) => {
                                        return(
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver ? '#64b5f6': '#a6d4fa',
                                                    padding: 4,
                                                    width: 250, 
                                                    minHeight: 500
                                                }}
                                            >
                                                {column.items.map((item, index) => {
                                                    return(
                                                        <Draggable key={item.name} draggableId={item.name} index={index}>
                                                            {(provided, snapshot) => {
                                                                return(
                                                                    <div 
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            userSelect: 'none',
                                                                            padding: 16, 
                                                                            margin: '0 0 8px 0',
                                                                            minHeight: '50px',
                                                                            backgroundColor: snapshot.isDragging ? '#263b4a': 'black',
                                                                            color: 'white',
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                    >  
                                                                        <img 
                                                                            src={(item.imageName) ? item.imageName : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs'} 
                                                                            alt={`${item.name} Img `} height={40} width={40} 
                                                                        />
                                                                        {item.name}
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
    
}


export default BoardView;
