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

  update(id,task) {
    const where = window.encodeURI(`{"id": ${id}}`)

    return ApiService.post(`/tasks/update?where=${where}`, task)
      .then(({data}) => data)
  }

  delete(id) {
    return ApiService.delete(`/tasks/${id}`)
      .then(({data}) => data)
  }
}

export default new TaskService()
