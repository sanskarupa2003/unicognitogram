import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Signup from './Signup';
import Signin from './Signin';
import Feed from './Feed';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/feed" component={Feed} />
      <Route path="/*" render={() => <h1 style={{ color: '#FFFFFF' }}>Go to /</h1>} />
    </Switch>
  </BrowserRouter>
);

reportWebVitals();
