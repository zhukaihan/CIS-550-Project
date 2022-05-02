import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<LandingPage />
							)}/>
        <Route exact
							path="/registration"
							render={() => (
								<RegistrationPage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

