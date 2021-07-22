import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../store/GlobalState'

export default function InsModal() {
    const { modalChildren, closeModal } = useContext(GlobalContext)
    return (
        <div className="fixed h-full w-full left-0 top-0 z-50">
            <div className="bg-black z-50 bg-opacity-50 fixed h-full w-full left-0 top-0" onClick={() => closeModal()}></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-50 shadow-lg rounded z-50" style={{ minWidth: 600 }}>
                {modalChildren}
            </div>
        </div>
        
    )
}
