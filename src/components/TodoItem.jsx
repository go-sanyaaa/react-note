import React from 'react'
import {inject, observer} from "mobx-react";
import {Button, Icon, Label, List} from "semantic-ui-react";

function TodoItem({task, todoStore}) {
  function toggleTask(id) {
    const task = Object.assign({}, todoStore.tasks.find(t => t.id === id))

    todoStore.updateTask(id, {
      done: !task.done
    })
  }

  return (
    <List.Item>
      <List.Content floated='right'>
        <Button.Group size='small'>
          <Button onClick={() => toggleTask(task.id)} color={task.done ? 'red' : 'green'}>{!task.done ? 'Done' : 'Undone'}</Button>
          <Button>Edit</Button>
        </Button.Group>
        <Button onClick={() => todoStore.deleteTask(task.id)} negative icon className='todo-delete' size='small'>
          <Icon name='trash'/>
        </Button>
      </List.Content>
      <List.Content >
        <List.Header className='todo-header'>
          {task.title}
          {task.done ? <Label size='tiny' color='green' className='todo-label' content='Выполнено'/> : ''}
        </List.Header>
        <List.Description>{task.body}</List.Description>
      </List.Content>
    </List.Item>
  )
}

export default inject('todoStore')(observer(TodoItem))