import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import localforage from 'localforage';
import { GlobalContext } from '../../store/GlobalState';

export default function PrototypeNav() {

    const { loadPresentation } = useContext(GlobalContext)

    return (
        <div className="bg-gray-900 p-2 w-full flex fixed bottom-0 left-0 z-50">
            <span className="mr-2 text-gray-500">Prototype:</span>
            <NavLink to="/home" className="text-white mr-2">Dashboard</NavLink>
            <button 
            onClick={() => {
                localforage.clear((err) => {
                    if (!err) {
                        loadPresentation()
                    }
                })
            }}
            className="text-white mr-2">Reset All</button>
        </div>
    )
}
