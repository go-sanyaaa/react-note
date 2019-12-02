import React, {useState} from 'react'
import {Button, Card, Form, Input, Modal, TextArea} from "semantic-ui-react";

function TodoEditModal({open, onClose, task, onSave}) {
  const [localTaskTitle, setTaskTitle] = useState(task ? task.title : undefined)
  const [localTaskBody, setTaskBody] = useState(task ? task.title : undefined)
  const [isLoading, setLoading] = useState(false)

  const trueTitle = localTaskTitle !== undefined ? localTaskTitle : task ? task.title : undefined
  const trueBody = localTaskBody !== undefined ? localTaskBody : task ? task.body : undefined

  const titleIsChange = trueTitle !== undefined ? trueTitle !== (task ? task.title : '') : false
  const bodyIsChange = trueBody !== undefined ? trueBody !== (task ? task.body : '') : false

  const hasChanges = titleIsChange || bodyIsChange

  function closeModal() {
    setTaskTitle(undefined)
    setTaskBody(undefined)
    onClose()
  }

  function changeTask() {
    setLoading(true)

    onSave({
      id: task ? task.id : 0,
      title: trueTitle,
      body: trueBody
    })
      .finally(resp => {
        setLoading(false)
      })
  }

  return (
    <Modal open={open} onClose={closeModal}>
      { task ? (
        <>
          <Modal.Header>Редактирование задачи #{task.id}</Modal.Header>
          <Modal.Content>
            <Input transparent fluid placeholder='Название' size='huge'
               value={trueTitle}
               onChange={(e) => setTaskTitle(e.target.value)}
            />
            <Form style={{margin: '20px 0'}}>
              <TextArea placeholder='Описание'
                value={trueBody}
                onChange={(e) => setTaskBody(e.target.value)}
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={closeModal} negative floated='left'>Отменить</Button>
            <Button loading={isLoading} onClick={() => hasChanges && changeTask()} positive={hasChanges}>Сохранить</Button>
          </Modal.Actions>
        </>
      ) : null}

    </Modal>
  )
}

export default TodoEditModal