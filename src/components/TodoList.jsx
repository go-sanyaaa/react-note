import React from "react";
import {inject, observer} from "mobx-react";
import {List, Segment} from "semantic-ui-react";

function TodoList({todoStore}) {
  return (
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
  )
}

export default inject('todoStore')(observer(TodoList))
