import React from 'react'

function TextAreaInput({innerRef, onChange, label, defaultValue, placeholder}) {
    return (
        <>
        <div className="w-full">
            {label ? <span className="text-sm text-gray-500">{label}</span> : null}
            <textarea 
            defaultValue={defaultValue}
            onChange={onChange}
            ref={innerRef}
            placeholder={placeholder}
            className="px-2 w-full rounded py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-800" 
            type="text"/>
        </div>
        </>
    )
}

export default TextAreaInput