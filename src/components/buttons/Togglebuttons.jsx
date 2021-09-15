import React from 'react'

export default function Togglebuttons({ items, selection }) {



    return (
        <div className="flex border border-gray-600 rounded-sm w-full">
            {
                items && items.length > 0 && items.map((item, index) => {
                   return <button 
                    key={index}
                    className={`p-2 border-r ${item.id === selection.id ? 'bg-gray-700 text-white' : 'text-gray-700'}`}
                    onClick={item.onClick}>{item.children}</button>
                })
            }
        </div>
    )
}
