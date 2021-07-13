import React from 'react'
import {
    Link,
    NavLink
  } from "react-router-dom";
import DropDown from '../DropDown';
import InscribeIcon from './../../assets/icons/inscribe.svg';
import PageFlowIcon from './../../assets/icons/pageflow.svg';
import { useHistory } from "react-router-dom";

function DashboardBar() {

  let history = useHistory();


  const items = [
    {
      id: 0, 
      icon: <img className="mr-3" width="20" src={InscribeIcon} alt="" />,
      text: 'Article',
      disabled: true,
      description: 'Includes article writing and editing tools'
    },
    {
      id: 1, 
      icon: <img className="mr-3" width="20" src={PageFlowIcon} alt="" />,
      text: 'Presentation',
      action: () => history.push("/editor/presentation/"), 
      disabled: false,
      description: 'Digital content layout and presentation tools.'
    },

  ]
    return (
        <div className="flex px-4 border-b border-gray-100 justify-between fixed w-full" style={{backgroundColor: '#F8F8F8' }}>
          <div className="flex flex-row">
            <DropDown items={items}>
              <div className="py-4 px-4 text-gray-500 hasDropdown cursor-pointer">New</div>
              </DropDown>

              <a className="py-4 px-4 text-gray-500" href="/">Open...</a>
              <NavLink to="/home" activeClassName="border-b-4 border-indigo-500 text-indigo-500" className="px-4 py-4 text-gray-500">Home</NavLink>
              <NavLink to="/extensions" activeClassName="border-b-4 border-indigo-500  text-indigo-500" className="px-4 py-4 text-gray-500">Extensions</NavLink>

          </div>
      {/* <UserInfo /> */}
    </div>
    )
}

export default DashboardBar
