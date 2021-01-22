import React from 'react'
import {
    Link,
    NavLink
  } from "react-router-dom";
import UserInfo from './UserInfo';
import Badge from '@material-ui/core/Badge'
import { Typography } from '@material-ui/core';

function DashboardBar() {
    return (
        <div className="flex px-4 border-b justify-between fixed w-full" style={{backgroundColor: '#F8F8F8' }}>

          <div className="flex flex-row">
              <a className="py-4 px-4" href="/">New</a>
              <a className="py-4 px-4" href="/">Open...</a>
              <NavLink to="/home" activeClassName="border-b-4 border-pink-700 text-pink-700" className="px-4 py-4">Home</NavLink>
              <NavLink to="/extensions" activeClassName="border-b-4 border-pink-700 text-pink-700" className="px-4 py-4">Extensions</NavLink>

          </div>
      <UserInfo />
    </div>
    )
}

export default DashboardBar
