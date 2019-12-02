import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import TodoMenu from "./TodoMenu";
import {Card, Input, Label, List, Segment, Button, TextArea, Form} from "semantic-ui-react";

const menuItems = [
  {title: 'Все', key: 'all'},
  {title: 'Предстоящие', key: 'notDone'},
  {title: 'Выполненные', key: 'done'},
]

function TodoList({todoStore}) {
  const [activeMenu, setActiveMenu] = useState('all')
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
    <div>
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

      <TodoMenu items={menuItems} active={activeMenu} onClick={setActiveMenu}/>

      <Segment textAlign='left'>
        <List divided relaxed='very' size='huge'>
          {todoStore.tasks.map(task => (
            <List.Item  key={task.id}>
              <List.Header>{task.title}</List.Header>
              <List.Description>{task.body}</List.Description>
            </List.Item>
          ))}
        </List>
      </Segment>

    </div>
  )
}

export default inject('todoStore')(observer(TodoList))
