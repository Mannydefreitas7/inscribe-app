import React from 'react'

export default function HeaderTitle(props) {
    return (
        <div className="border-b border-gray-200 pl-4 pr-3 py-3 flex justify-between items-center bg-gray-800">
            <span className="text-gray-200 font-medium">{props.title}</span>
            {props.children ? props.children : null}
        </div>
    )
}
