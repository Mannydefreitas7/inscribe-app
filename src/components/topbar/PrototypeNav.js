import React from 'react'
import { NavLink } from 'react-router-dom'

export default function PrototypeNav() {
    return (
        <div className="bg-gray-900 p-2 w-full flex fixed bottom-0 left-0 z-50">
            <span className="mr-2 text-gray-500">Prototype:</span>
            <NavLink to="/home" className="text-white mr-2">Dashboard</NavLink>
            <NavLink to="/editor" className="text-white">Editor</NavLink>
        </div>
    )
}
