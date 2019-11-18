import React from 'react';
import {Switch, Route, Link} from 'react-router-dom'
import './App.css';
import AuthView from "./views/auth";
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
      <Switch>
          <Route path='/login'>
              <AuthView/>
          </Route>
          <Route path='/'>
              <Link to='/login'>Войти</Link>
          </Route>
      </Switch>
  );
}

export default App;
