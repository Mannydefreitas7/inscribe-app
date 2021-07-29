import React, { useState } from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../store/GlobalState'

export default function DroppableZone(props) {
    const { handleOnDrop } = useContext(GlobalContext)
  

    return (
        <div 
            id={`droppable-${props.id}`} 
            index={props.index}
            onDrop={handleOnDrop}
        >
            {props.children}
        </div>
        
    )
}
