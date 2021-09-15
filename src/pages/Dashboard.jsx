import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { GlobalProvider } from '../store/GlobalState';
import DashboardBar from '../components/topbar/DashboardBar';
import ArticleEditor from './ArticleEditor';
import Extensions from './Extensions';
import Home from './Home';
import localforage from 'localforage';
import EditorView from './EditorView';
import PresentationEditor from './PresentationEditor';

function Dashboard() {

  useEffect(() => {
    localforage.config({
        driver: localforage.LOCALSTORAGE,
        name: 'inscribe',
        version: 1.0,
    });
},[]);


    return (
    <Router>
      <GlobalProvider>
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
          <Route path="/presentation" exact>
            <EditorView>
              <PresentationEditor />
            </EditorView>
          </Route>

          <Route path="/article" exact>
            <EditorView>
              <ArticleEditor />
            </EditorView>
          </Route>
        </Switch>
      </div>
      </GlobalProvider>
    </Router>
    )
}

export default Dashboard
