import { taskDialog } from './dialog.js';

export class Task {
    constructor(id, title, description, dueDate, priority, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.container = document.createElement('div');
        this.container.draggable = true;
        this.container.dataset.id = this.id;

        this.mount();

    }

    mount() {
        this.container.addEventListener('click', (event) => {
            if (event.target.matches('.delete-task-button')) {
                this.container.remove();
            }
            else if (event.target.matches('.edit-task-button')) {
                taskDialog.editingTask = this;
                taskDialog.edit = true;
                taskDialog.show();
            }
        });

        this.container.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', this.id);
            this.container.classList.add('dragging');
        });

        this.container.addEventListener('dragend', (event) => {
            this.container.classList.remove('dragging');
        });
    }

    render() {
        this.container.innerHTML = `
            <div class="card task-info">
                <h3>${this.title}</h3>
                <p>${this.description}</p>
                <p>Due: ${this.dueDate}</p>
                <p>Priority: ${this.priority}</p>
                <p>Status: ${this.status}</p>
                <div class="button-group">
                    <button class="edit-task-button">Edit</button>
                    <button class="delete-task-button">Delete</button>
                </div>
            </div>          
        `;

        return this.container;
    }

    update(newTaskData) {
        if (newTaskData.statuc !== this.status) {
            const newColumn = document.getElementById(newTaskData.status);
            newColumn.appendChild(this.container);
        }

        this.title = newTaskData.title;
        this.description = newTaskData.description;
        this.dueDate = newTaskData.dueDate;
        this.priority = newTaskData.priority;
        this.status = newTaskData.status;
        this.render()
    }
}
