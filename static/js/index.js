import { taskDialog } from './dialog.js';

const addTaskButtons = document.getElementsByClassName('add-task-button');
const columns = document.querySelectorAll('.column');
const tasks = new Map();
taskDialog.mount(tasks);

try {
    for (let button of addTaskButtons) {
        button.addEventListener('click', () => {
            taskDialog.edit = false;
            document.getElementById('task-status').value = button.parentElement.id;
            taskDialog.show();
        })
    };

} catch (error) {
    alert(error)
}

for (const column of columns) {
    column.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.dataTrasnfer.dropEffect = 'move';
        column.classList.add('drag-over');
    });

    column.addEventListener('dragleave', () => {
        column.classList.remove('drag-over');
    });

    column.addEventListener('drop', (event) => {
        event.preventDefault();
        column.classList.remove('drag-over');

        const id = Number(event.dataTransfer.getData('text/plain'));
        const task = tasks.get(id);
        if (!task) return;
        task.status = column.id;
        column.appendChild(task.container);
        column.appendChild(column.querySelector('.add-task-button'))
    });
}
