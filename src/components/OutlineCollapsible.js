import React from 'react'
import { useState } from 'react'
import ArrowDown from './../assets/icons/arrow-down.svg'

export default function OutlineCollapsible(props) {

const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={`pl-2 cursor-move rounded hover:bg-gray-100 ${props.item.isSelected ? 'bg-gray-100' : ''} bg-opacity-10`}>
            <div className="p-2 flex justify-between">
                <div>
                    <span className="text-gray-700 text-sm">{props.item.data}</span> <br />
                    <span className="text-gray-500 text-xs">{props.item.description}</span>
                </div>
                {
                    props.item.type === 'container' || props.item.type === 'columns' ?
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <img src={ArrowDown} alt="" style={{ 
                            width: 24, 
                            transform: `rotate(${ isOpen ? '0' : '90' }deg)`,
                            transition: 'transform .3s'
                            }} />
                    </button> : null
                }
                
            </div>
            {
                isOpen ?
                <div className="p-2">
                    {props.children}
                </div> : null
            }
        </div>
    )
}
