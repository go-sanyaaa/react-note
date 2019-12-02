import React from 'react'
import {Grid, Menu, MenuItem, Button, Segment, Card, Label} from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import logoImg from '../logo.png'
import AuthService from '../services/auth.service'
import {inject, observer} from "mobx-react";
import TodoList from "../components/TodoList";


class IndexView extends React.Component{
  handleSignOut = () => {
    AuthService.logout()
    this.props.history.push('/login')
  }

  componentDidMount() {
    this.props.todoStore.fetchTasks()
  }

  render() {
    const isLoggedIn = !!localStorage.getItem('token')

    return (
      <Grid textAlign='center' style={{ height: '100vh', margin: '60px 0px' }}>
        <Grid.Column style={{ width: 1000 }}>
          <Menu>
            <MenuItem>
              <img alt='Логотип' src={logoImg}/>
              <h4 style={{margin: '0 0 0 10px'}}>ToDo App</h4>
            </MenuItem>

            <MenuItem position='right'>
              { isLoggedIn ? (
                  <Button onClick={this.handleSignOut} color='red'>Выйти</Button>
                ) : (
                  <Link to={'/login'}>
                    <Button onClick={this.handleSignOut} color='green'>Войти</Button>
                  </Link>
                )
              }

            </MenuItem>
          </Menu>
          <TodoList/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default new inject('todoStore')(observer(withRouter(IndexView)))
