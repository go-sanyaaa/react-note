import React from 'react'
import {Grid} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import {inject, observer} from "mobx-react";
import TodoList from "../components/TodoList";
import TodoMenu from "../components/TodoMenu";
import TodoCreate from "../components/TodoCreate";
import Header from "../components/Header"

const menuItems = [
  {title: 'Все', key: 'all'},
  {title: 'Предстоящие', key: 'notDone'},
  {title: 'Выполненные', key: 'done'},
]

class IndexView extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      activeMenu: 'all'
    }
  }

  componentDidMount() {
    this.props.todoStore.fetchTasks()
  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh', margin: '60px 0px' }}>
        <Grid.Column style={{ width: 1000 }}>
          <Header/>
          <TodoCreate/>
          <TodoMenu
            items={menuItems}
            active={this.state.activeMenu}
            onClick={(activeMenu) => this.setState({activeMenu})}
          />
          <TodoList/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default new inject('todoStore')(observer(withRouter(IndexView)))
