import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import DashboardBar from './../components/topbar/DashboardBar';
import ArticleEditor from './ArticleEditor';
import Extensions from './Extensions';
import Home from './Home';

function Dashboard() {
    return (
    <Router>
      <div>
        <Switch>
        <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
        <Route path="/home">
        <DashboardBar />
        <div className="pt-10">
            <Home />
            </div>
          </Route>
          <Route path="/extensions">
          <DashboardBar />
        <div className="pt-10">
            <Extensions />
            </div>
          </Route>
          <Route path="/editor/article" >
              <ArticleEditor />
          </Route>
        </Switch>
      </div>
    </Router>
    )
}

export default Dashboard
