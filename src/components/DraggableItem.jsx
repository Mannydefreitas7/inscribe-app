import React, { useContext } from 'react'
import { GlobalContext } from '../store/GlobalState'

export default function DraggableItem(props) {

    const { handleOnDrag } = useContext(GlobalContext)

    return (
        <div id={props.id} onDrag={handleOnDrag}  {...props}>
            {props.children}
        </div>
    )
}
