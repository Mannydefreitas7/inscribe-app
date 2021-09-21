import React from 'react'
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";

export default function InsContextMenu(props) {
    return (
        <>
            <ContextMenuTrigger id={props.id}>
                {props.children}
            </ContextMenuTrigger>
            <ContextMenu id={props.id} className="py-1 bg-gray-50 shadow rounded-sm z-50" style={{ minWidth: 200 }}>
                {props.buttons && props.buttons.map((button, index) => (
                <MenuItem 
                    key={index}
                    data={props.data}
                    className="flex items-center w-full justify-between py-2 px-4 border-gray-100 hover:bg-black hover:bg-opacity-5"
                    onClick={button.action}
                    >
                        <span className="text-gray-500 text-sm">{button.label}</span>
                        { button.icon ?  <img src={button.icon}  alt={button.label} style={{ maxWidth: 15 }}/> : null }
                    </MenuItem>
                ))}

                   
                </ContextMenu>
            
        </>
    )
}
