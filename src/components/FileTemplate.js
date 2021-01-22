import React from 'react'


function FileTemplate(props) {
    
    return (
        <div className="px-2 py-2 hover:bg-gray-200 rounded">
            <img className="w-full rounded" src={`images/${props.image}`} alt={props.name} />
            <p className="text-sm leading-5 py-2">{props.name}</p>
        </div>
    )
}

export default FileTemplate
