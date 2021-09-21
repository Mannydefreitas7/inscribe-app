import React from 'react'


function FileTemplate(props) {
    
    return (
        <div className="px-2 py-2 hover:bg-gray-100 hover:bg-opacity-50 rounded cursor-pointer" {...props}>
            <img className="w-full rounded bg-gray-50" src={`images/${props.image}`} alt={props.name} />
            <p className="text-xs leading-5 py-2 text-gray-500">{props.name}</p>
        </div>
    )
}

export default FileTemplate
