import React from "react";
import {List, Segment} from "semantic-ui-react";
import TodoItem from "./TodoItem";

function TodoList({tasks}) {
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

export default TodoList
