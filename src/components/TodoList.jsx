import React from "react";
import {inject, observer} from "mobx-react";
import {List, Segment} from "semantic-ui-react";
import TodoItem from "./TodoItem";

function TodoList({todoStore, tasks}) {
  return (
    <Segment textAlign='left'>
      <List divided relaxed='very' size='huge'>
        {tasks.map(task => (
          <TodoItem key={task.id} task={task}/>
        ))}
      </List>
    </Segment>
  )
}

export default inject('todoStore')(observer(TodoList))
