import ApiService from './api.service'

class TaskService {
  fetch() {
    return ApiService.get('/tasks')
      .then(({data}) => data)
  }

  add(task = {done: false}) {
    return ApiService.post('/tasks', task)
      .then(({data}) => data)
  }
}

export default new TaskService()
