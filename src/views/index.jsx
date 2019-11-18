import React from 'react'
import {Grid, Menu, MenuItem, Button} from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import logoImg from '../logo.png'

class IndexView extends React.Component{
  constructor(props) {
    super(props)

    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut(){
    localStorage.removeItem('token')
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
        </Grid.Column>
      </Grid>
    )
  }


}

export default withRouter(IndexView)
