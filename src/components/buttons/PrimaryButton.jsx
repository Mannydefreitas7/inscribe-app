import React from 'react'

export default function PrimaryButton(props) {
    return (
        <button 
            onClick={props.onClick}
            className={`${props.label && props.icon ? 
            'pr-3 pl-2 py-1' :
            props.icon ? 
            'p-3' : 'px-2 py-1'
            } inline-flex items-center rounded-sm bg-${props.bgColor}-700 hover:bg-${props.bgColor}-800 mx-1`}>
                {
                    props.icon ? <img className="mr-2" src={props.icon} style={{ width: 15 }} alt={props.label} /> : null
                }
                {
                    props.label ? <span className="text-sm text-white">{props.label}</span> : null
                }
        </button>
    )
}
