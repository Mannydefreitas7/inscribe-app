import React from 'react'
import { useContext } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { GlobalContext } from '../store/GlobalState'


export default function ColumnsEditor(props) {

    const { selectedItem, selectItem } = useContext(GlobalContext)

    return (
        <Droppable
                    key={4}
                    ignoreContainerClipping={true}
                    droppableId={`${props.item.id}`}
                    isDropDisabled={false}
                >   
                {(_provided, _snapshot) => (
        <div 
        ref={_provided.innerRef}
        className={`cursor-default relative w-full ${selectedItem && props.item.id === selectedItem.id ? 'border-2 border-indigo-300 border-dashed rounded-sm' : ''} ${_snapshot.isDraggingOver ? 'bg-indigo-100 p-1' : null}`} onClick={() => selectItem(props.item)}>
            {console.log(_snapshot)}
            <div className={props.item.classlist}>
                {
                    props.item.children && props.item.children.length > 0 && props.item.children.map((column, index) => {

                        return <div key={index} className={`${column.classlist} `}>
                            
                        <div>Column</div>

                        </div>

                    })
                }
            </div>
            {_provided.placeholder}
        </div>
        
         )}
         </Droppable>
    )
}
