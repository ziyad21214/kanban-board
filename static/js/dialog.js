import { Task } from './task.js';
export class TaskDialog {
    constructor({ edit } = {}) {
        this.edit = edit;
        this.container = document.getElementById('task-dialog');
        this.taskForm = document.getElementById('task-form');

    }

    mount(tasks) {
        document.getElementById('dialog-close-button').addEventListener('click', () => {
            this.close();
        });

        document.getElementById('task-form').addEventListener('submit', (event) => {
            event.preventDefault();
            this.close();
            const taskData = this.getData();
            const column = document.getElementById(taskData.status);

            if (this.edit) {
                this.editingTask.update(taskData);
                column.appendChild(column.querySelector('.add-task-button'));
            } else {
                const { title, description, dueDate, priority, status } = taskData;
                const newTask = new Task(Date.now(), title, description, dueDate, priority, status);
                tasks.set(newTask.id, newTask);
                column.appendChild(newTask.render());
                column.appendChild(column.querySelector('.add-task-button'));

                
            }
        });
    }

    show() {
        if (this.edit) {
            this.container.querySelector('.dialog-title').textContent = 'Edit Task';
            this.container.querySelector('.dialog-submit-button').textContent = 'Edit';
        }

        this.container.showModal();
    }

    getData() {
        return {
            title: this.taskForm.elements['task-title'].value,
            description: this.taskForm.elements['task-description'].value,
            dueDate: this.taskForm.elements['task-due-date'].value,
            priority: this.taskForm.elements['task-priority'].value,
            status: this.taskForm.elements['task-status'].value
        }
    }

    close() {
        this.container.close()
    }
}
export const taskDialog = new TaskDialog();