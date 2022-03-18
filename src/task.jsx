import React from "react";
import styled from 'styled-components';
// Importing the drag component, making the tasks draggable.
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    // background-color: white; 
    // If (?) the dragging is true, background lightgreen. Else (:) background white
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

export default class Task extends React.Component {
    render () {
        return (
            // Again, if must be unique, assign it to the task id in this instance. Also needs an index.
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {(provided, snapshot) => (
                    // draggableProps must be added to the component you want to drag. Snapshot contains properties you can use to STYLE the component DURING a drag.
                    // dragHandleProps, added to the part of the component you want to handle.
                    <Container 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps} 
                        innerRef={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        >
                        {this.props.task.content}
                    </Container>
                )}
            </Draggable>
        );
    }
}
