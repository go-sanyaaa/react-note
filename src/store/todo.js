import {computed, decorate, observable, action} from "mobx";
import TaskService from '../services/task.service'

class Todo {
  tasks = []
  isLoading = false

  get unfinishedTasks() {
    return this.tasks.filter(task => !task.done)
  }

  get finishedTasks() {
    return this.tasks.filter(task => task.done)
  }

  fetchTasks() {
    TaskService.fetch()
      .then(tasks => {
        this.tasks = tasks
      })
  }

  createTask(task) {
    return TaskService.add(task)
      .then(newTask => {
        this.tasks = [...this.tasks,newTask]
        return newTask
      })
  }

  updateTask(task) {
    return TaskService.update(task.id, task)
      .then(resp => {
        const taskIndex = this.tasks.findIndex(t => t.id === task.id)
        const updatedTask = Object.assign(this.tasks[taskIndex], task)

        this.tasks = [...this.tasks.slice(0,taskIndex), updatedTask , ...this.tasks.slice(taskIndex + 1)]

        return resp
      })
  }

  deleteTask(id) {
    return TaskService.delete(id)
      .then(resp => {
        const taskIndex = this.tasks.findIndex(t => t.id === id)
        this.tasks = [...this.tasks.slice(0,taskIndex), ...this.tasks.slice(taskIndex + 1)]
      })
  }
}

export default decorate(Todo, {
  tasks: observable,
  isLoading: observable,
  fetchTasks: action,
  createTask: action,
  unfinishedTasks: computed,
  finishedTasks: computed
})
