import React from 'react'
import {
    NavLink
  } from "react-router-dom";
import InsMenu from './../modal/InsMenu';
import { useHistory } from "react-router-dom";
import { useContext } from 'react';
import BrochureIcon from './../../assets/icons/brochure.svg';
import { GlobalContext } from '../../store/GlobalState';

function DashboardBar() {

  let history = useHistory();
  const { closeDropdown } = useContext(GlobalContext);

  const items = [
    // {
    //   id: 0, 
    //   text: 'Article',
    //   action: () => { 
    //     closeDropdown()
    //     history.push("/article/") 
    //   }, 
    //   disabled: false,
    //   description: 'Includes article writing and editing tools'
    // },
    {
      id: 1, 
      icon: <img src={BrochureIcon} className="mr-3" alt="" />,
       text: 'Layout Design',
      action: () => { 
        closeDropdown()
        history.push("/presentation/") 
      }, 
      disabled: false,
      description: 'Digital content layout and presentation tools.'
    },
  ]
    return (
        <div className="flex px-4 border-b-2 border-gray-100 justify-between fixed w-full" style={{backgroundColor: '#F8F8F8' }}>
          <div className="flex flex-row">
            <InsMenu items={items} title="Project">
              <div className="py-4 px-4 text-gray-500 hasDropdown cursor-pointer">New</div>
            </InsMenu>
              
                <div className="choose_file">
                  <button type="button" className="py-4 px-4 text-gray-500" >Open...</button>
                  <input name="img" type="file" style={{ display: 'none' }} />
                </div>
              <NavLink to="/home" activeClassName="border-b-4 border-indigo-500 text-indigo-500" className="px-4 py-4 text-gray-500">Home</NavLink>
              {/* <NavLink to="/extensions" activeClassName="border-b-4 border-indigo-500  text-indigo-500" className="px-4 py-4 text-gray-500">Extensions</NavLink> */}

          </div>
      {/* <UserInfo /> */}
    </div>
    )
}

export default DashboardBar
