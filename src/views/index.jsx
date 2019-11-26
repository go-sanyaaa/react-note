import React from 'react'
import {Grid, Menu, MenuItem, Button, Segment, Card, Label} from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import logoImg from '../logo.png'
import AuthService from '../services/auth.service'

class IndexView extends React.Component{
  constructor(props) {
    super(props)
  }

  handleSignOut = () => {
    AuthService.logout()
    this.props.history.push('/login')
  }

  render() {
    const isLoggedIn = !!localStorage.getItem('token')

    return (
      <Grid textAlign='center' style={{ height: '100vh', margin: '0px' }}>
        <Grid.Column style={{ width: 1000 }}>
          <Menu>
            <MenuItem>
              <img src={logoImg}/>
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
          <Segment textAlign='left' raised>
            <h1>Список задач:</h1>
            <Card.Group>
              <Card fluid>
                <Card.Content>
                  <Card.Header>Заголовок</Card.Header>
                  <Card.Meta><Label size='tiny' color='teal'>Done</Label></Card.Meta>
                  <Card.Description>Описание</Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }


}

export default withRouter(IndexView)
