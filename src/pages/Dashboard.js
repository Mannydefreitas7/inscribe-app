import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import DashboardBar from './../components/topbar/DashboardBar';
import Extensions from './Extensions';
import Home from './Home';

function Dashboard() {
    return (
    <Router>
      <div>
        <DashboardBar />
        <div className="pt-10">
        <Switch>
        <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
        <Route path="/home">
            <Home />
          </Route>
          <Route path="/extensions">
            
            <Extensions />
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
    )
}

export default Dashboard
