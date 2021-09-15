import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from './../../store/GlobalState'
import Draggable from 'react-draggable';
export default function InsModal() {
    const { modalChildren, closeModal, modalPosition } = useContext(GlobalContext)
    return (
        <div className="fixed h-full w-full left-0 top-0 z-50 mt-8">
            <div className="bg-white z-50 bg-opacity-0 fixed h-full w-full left-0 top-0" onClick={() => closeModal()}></div>
            <Draggable 
            
            positionOffset={{ x: modalPosition.x, y: modalPosition.y }}
            >
                
                    <div
                    className="absolute overflow-hidden bg-gray-50 shadow-lg rounded z-50" style={{ minWidth: 300, maxHeight: '100%' }}> 
                        {modalChildren}
                    </div>
                
            </Draggable>
        </div>
        
    )
}
