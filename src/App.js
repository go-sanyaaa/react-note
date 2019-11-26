import React from 'react';
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import routes from "./routes";
import AuthService from './services/auth.service'
import JwtService from './services/jwt.service'

function App() {
  const Routes = routes.map(route =>
    route.private ? (
      <PrivateRoute key={route.name} path={route.path} component={route.component}/>
    ) : (
      <Route key={route.name} path={route.path} component={route.component}/>
    )
  );

  return (
    <Switch>
      {Routes}
    </Switch>
  );
}

function PrivateRoute({component, ...rest}) {
  const userId = AuthService.getUserId()

  return (
    <Route
      {...rest}
      render={({location}) =>
        userId ? (
          <Route component={component}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: {from: location}
          }}/>
        )
      }
    />
  )
}

export default App;
