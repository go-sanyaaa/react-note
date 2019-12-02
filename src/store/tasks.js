import {computed, decorate, observable, action} from "mobx";
import TaskService from '../services/task.service'

class Tasks {
  tasks = []
  isLoading = false

  get unfinishedTasks() {
    return this.tasks.filter(task => !task.done)
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
      })
  }
}

export default decorate(Tasks, {
  tasks: observable,
  isLoading: observable,
  fetchTasks: action,
  createTask: action,
  unfinishedTasks: computed
})
