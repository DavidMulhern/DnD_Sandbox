import React from "react";
// Importing styled component lib.
import styled from 'styled-components';
// Importing Task component.
import Task from './task'
// Importing droppable - Area which allows component dropping.
import { Droppable } from 'react-beautiful-dnd'

// A container to wrap the column.
const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
`;
// Pre styled h3 title
const Title = styled.h3`
    padding: 8px;
`;
// The area in which we render out the tasks. For now, just using div.
const TaskList = styled.div`
    padding: 8px;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
`;

// Declare some styling of choice above.
// The below class renders and returns desired fields.

export default class Column extends React.Component {
    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                {/* Droppable id must be unique, so using the column id. */}
                {/* provided.droppableProps must be applied to the component you deem droppable. */}
                <Droppable droppableId={this.props.column.id}>
                    {(provided, snapshot) => (
                        <TaskList 
                            ref={provided.innerRef} 
                            innderRef={provided.innerRef} 
                            {...provided.droppableProps}
                            isDraggingOver = {snapshot.isDraggingOver}
                            >
                            {this.props.tasks.map((task, index) => (<Task key={task.id} task={task} index={index}/>
                            ))}
                            {/* A placeholder is a react element used to increase the space, during a drag as needed. */}
                            {provided.placeholder} 
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        );
    }
}
