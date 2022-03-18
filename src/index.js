import React from 'react';
import ReactDOM from 'react-dom';
// Import and use it as the basis of rendering the application.
import initialData from './initital-data';
// This class renders out field of data
import Column from './column'
// CSS reset
import '@atlaskit/css-reset';
// Beautiful DnD import
import { DragDropContext } from 'react-beautiful-dnd'

class App extends React.Component {
  // Setting state of application to initialData.
  state = initialData;

  // The onDragEnd function will update the state.
  onDragEnd = result => {
    const { destination, source, draggableId} = result;

    // User dragged to a undroppable destination.
    if(!destination){
      return;
    }

    // See if location of draggable changed. User could have picked up and dropped in that start position.
    if(destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Reorder task id column.
    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    // Now need to move the task ID from old to new.
    // Splice will modify. "From this index, we want to remove one item"
    newTaskIds.splice(source.index, 1);
    // Use it again to destination. Remove one item, then insert the new item.
    newTaskIds.splice(destination.index, 0, draggableId);
    // Now need to create a new column which has the same properties as the old column but with a new task id array.
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    // ... the spread operator. Allows you to insert elements of one array into another.

    // We now have the new colum, need to put that into our state.
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        // This will override the column.
        [newColumn.id]: newColumn,
      }
    }

    // HERE HERE HERE - HOPEFULLY CAN STORE THIS NEW STATE ONO DB
    // Set the new state.
    this.setState(newState);
  };

  render() {
    // The array stores the order of which way we want to render the columns.
    // columnId is like a for each. This is a call back function, getting data 'returned' to it.
    // columnId has now been populated by columnOrder, which is 'column-1'
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map(columnId => {

        // Get column out of the state.
        const column = this.state.columns[columnId];
        // Get the tasks associated with the column
        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

        // Render out a column component.
        return <Column key={column.id} column={column} tasks={tasks} />;
        // this would just return the title of the column.
        // return column.title;
        })}
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));