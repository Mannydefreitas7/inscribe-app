import React from 'react'
import { useState } from 'react'
import ArrowDown from './../assets/icons/arrow-down.svg'

export default function Collaspible(props) {

const [isOpen, setIsOpen] = useState(true)

    return (
        <div>
            <div className="border-b border-gray-100 pl-4 pr-3 py-3 flex justify-between">
                <span className="text-gray-300 font-semibold">{props.title}</span>
                <button onClick={() => setIsOpen(!isOpen)}>
                    <img src={ArrowDown} alt="" style={{ 
                        width: 24, 
                        transform: `rotate(${ isOpen ? '0' : '90' }deg)`,
                        transition: 'transform .3s'
                        }} />
                </button>
            </div>
            {
                isOpen ?
                <div className="p-4">
                    {props.children}
                </div> : null
            }
        </div>
    )
}
