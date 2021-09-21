import React from 'react'

export default function SecondaryButton(props) {
    return (
        <button 
            {...props}
            className={`${props.label && props.icon ? 
            'pr-3 pl-2 py-1' :
            props.icon ? 
            'p-3' : 'px-2 py-1'
            } inline-flex items-center border-2 rounded-sm border-gray-100 hover:bg-gray-100`}>
                {
                    props.icon ? <img className="mr-2" src={props.icon} style={{ width: 15 }} alt={props.label} /> : null
                }
                {
                    props.label ? <span className="text-sm text-gray-500">{props.label}</span> : null
                }
        </button>
    )
}
