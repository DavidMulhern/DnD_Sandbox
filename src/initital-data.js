const initialData = {
    tasks: {
        // uses the task id as the lookup for the object.
        'task-1': { id: 'task-1', content: 'Take out the garbage' },
        'task-2': { id: 'task-2', content: 'Watch TV show' },
        'task-3': { id: 'task-3', content: 'Charge my phone' },
        'task-4': { id: 'task-4', content: 'Cook dinner' },
    },
    // Used to store the columns in the system.
    columns: {
        // column id used to look up the column.
        'column-1': {
            id: 'column-1',
            title: 'To do',
            // This array indicates ownership and maintains order.
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        },
    },
    // Facilitate reordering of the columns. Also output order.
    columnOrder: ['column-1'],
};

export default initialData;
