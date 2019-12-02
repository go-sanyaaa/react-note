import {Button, Card, Form, Input, TextArea} from "semantic-ui-react";
import React, { useState } from 'react'
import {inject, observer} from "mobx-react";

function TodoCreate({todoStore}) {
  const [todoTitle, setTodoTitle] = useState('')
  const [todoContent, setTodoContent] = useState('')

  const creatTask = () => {
    todoStore.createTask({
      title: todoTitle,
      body: todoContent
    })
      .then(resp => {
        setTodoContent('')
      })
  }

  return (
    <Card fluid>
      <Card.Content>
        <Input transparent fluid placeholder='Название' size='huge'
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <Form style={{margin: '20px 0'}}>
          <TextArea placeholder='Описание'
            value={todoContent}
            onChange={(e) => setTodoContent(e.target.value)}
          />
        </Form>
        <Button onClick={creatTask} positive fluid>Создать задачу</Button>
      </Card.Content>
    </Card>

    )
}

export default inject('todoStore')(observer(TodoCreate))