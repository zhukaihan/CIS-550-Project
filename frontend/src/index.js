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
import PricePage from './pages/prices/PricePage';
import PriceByTime from './pages/prices/PriceByTime';
import PriceSurges from './pages/prices/PriceSurges';
import PriceAboveMA from './pages/prices/PriceAboveMA';
import Tweets from './pages/tweets/Tweets';
import User from './pages/tweets/User';


ReactDOM.render(
  <div>
		<MenuBar />
    <Router>
	<Auth0ProviderHist>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<LandingPage />
							)}/>
				<Route exact
							path="/logout"
							render={() => (
								<LogOut />
							)}/>
				<Route exact
							path="/registration"
							render={() => (
								<RegistrationPage />
							)}/>
				<Route exact
							path="/prices"
							render={() => (
								<PricePage />
							)}/>
				<Route exact
							path="/priceByTime"
							render={() => (
								<PriceByTime />
							)}/>
				<Route exact
							path="/priceSurges"
							render={() => (
								<PriceSurges />
							)}/>
				<Route exact
							path="/User"
							render={() => (
								<User />
							)}/>
				<Route exact
							path="/Tweets"
							render={() => (
								<Tweets/>
							)}/>
				<Route exact
							path="/priceAboveMA"
							render={() => (
								<PriceAboveMA />
							)}/>
      </Switch>
	  </Auth0ProviderHist>
    </Router>
  </div>,
  document.getElementById('root')
);

