import React, { useEffect } from 'react'
import { useState } from 'react'
import ArrowDown from './../assets/icons/arrow-down.svg'

export default function Collaspible(props) {

const [isOpen, setIsOpen] = useState(true);
useEffect(() => {
    if (props.isOpen) {
        console.log(props.isOpen)
        setIsOpen(props.isOpen)
    }
}, [props.isOpen])

    return (
        <div>
            <div className="border-b-2 border-gray-100 pl-4 pr-3 py-3 flex justify-between">
                <span className="text-gray-300 font-medium">{props.title}</span>
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
