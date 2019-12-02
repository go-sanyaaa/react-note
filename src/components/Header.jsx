import React from 'react'
import {Button, Menu, MenuItem} from "semantic-ui-react";
import logoImg from "../logo.png";
import {Link} from "react-router-dom";
import AuthService from "../services/auth.service";

function Header() {
  const isLoggedIn = !!localStorage.getItem('token')

  function handleSignOut() {
    AuthService.logout()
    this.props.history.push('/login')
  }

  return (
    <Menu>
      <MenuItem>
        <img alt='Логотип' src={logoImg}/>
        <h4 style={{margin: '0 0 0 10px'}}>ToDo App</h4>
      </MenuItem>

      <MenuItem position='right'>
        { isLoggedIn ? (
          <Button onClick={handleSignOut} color='red'>Выйти</Button>
        ) : (
          <Link to={'/login'}>
            <Button onClick={handleSignOut} color='green'>Войти</Button>
          </Link>
        )
        }
      </MenuItem>
    </Menu>
  )
}

export default Header