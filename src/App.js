import React from 'react';
import Login from './Login';
import UploadRoute from './UploadRoute';
import Charte from './Charte'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <PrivateRoute path='/charte'>
              <Charte />
            </PrivateRoute>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

// ... rest is the props of of the private route
const PrivateRoute = ({ children, ...rest }) => {
  console.log("here");
  let access = localStorage.getItem('token') !== null;
  console.log(access);
  return (
    <Route {...rest} render={(props) =>
        access ?
        children
        : <Redirect to='/'/>
      }
    />
  )
}


export default App;
