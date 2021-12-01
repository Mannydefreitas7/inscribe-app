import React from 'react'

export default function Togglebuttons({ items, selection }) {



    return (
        <div className="flex overflow-hidden">
            {
                items && items.length > 0 && items.map((item, index) => {
                   return <button 
                    key={index}
                    onClick={item.onClick}
                    className={`
                    ${item.name && item.icon ? 'pr-3 pl-2 py-1' : item.icon ? 'p-2' : 'px-2 py-1'} 
                    ${selection.id && selection.id.includes(item.id) ? 'bg-gray-700 text-white border-gray-700' : 'border-gray-100'}
                    border-r-2 border-t-2 border-b-2
                    ${item.id === items[0].id ? 'border-l-2 rounded-tl-sm rounded-bl-sm' : ''}
                    ${item.id === items[items.length - 1].id ? 'border-r-2 rounded-tr-sm rounded-br-sm' : ''}
                        inline-flex items-center hover:text-white hover:bg-gray-700 hover:border-gray-700 rounded-none`}>
                            {
                                item.icon ? item.icon : null
                            }
                            {
                                item.name ? <span className={`text-sm  ${item.id === selection.id ? 'text-white' : 'text-gray-500'} hover:text-white `}>{item.name}</span> : null
                            }
                    </button>
                })
            }
        </div>
    )
}
 