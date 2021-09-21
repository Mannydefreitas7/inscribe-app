import React from 'react'

export default function Component(props) {
    return (
        <div id={props.component.id} className="w-62 p-2 hover:bg-black hover:bg-opacity-5 cursor-pointer rounded" {...props}>
            <img className="w-full mb-2" src={props.component.data} alt={props.component.description}/>
            <span className="text-gray-500 text-sm">{props.component.description}</span>
        </div>
    )
}
