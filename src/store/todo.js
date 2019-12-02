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
        this.tasks.push(newTask)
        return newTask
      })
  }

  updateTask(id, task) {
    return TaskService.update(id, task)
      .then(resp => {
        const taskIndex = this.tasks.findIndex(t => t.id === id)
        this.tasks[taskIndex].done = !this.tasks[taskIndex].done
      })
  }

  deleteTask(id) {
    return TaskService.delete(id)
      .then(resp => {
        const taskIndex = this.tasks.findIndex(t => t.id === id)
        this.tasks = this.tasks.splice(taskIndex-1,1)
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
