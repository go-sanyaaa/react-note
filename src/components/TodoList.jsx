import React, {useState} from "react";
import {Grid, List, Segment} from "semantic-ui-react";
import TodoItem from "./TodoItem";
import TodoEditModal from "./TodoEditModal";

function TodoList({tasks, onUpdate, onDelete}) {
  const [popupTask, setPopupTask] = useState(null)

  return (
    <Segment textAlign='left'>
      <List divided relaxed='very' size='huge'>
        {tasks.map(task => (
          <TodoItem
            onToggle={() => onUpdate({
              id: task.id,
              done: !task.done
            })}
            onDelete={() => onDelete(task.id)}
            onEdit={() => setPopupTask(task)}
            key={task.id}
            task={task}
          />
        ))}
      </List>
      <TodoEditModal task={popupTask} open={!!popupTask} onSave={onUpdate} onClose={() => setPopupTask(null)}/>
    </Segment>
  )
}

export default TodoList
