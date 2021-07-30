import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'

import { GlobalContext } from '../store/GlobalState'
import BlockEditor from './BlockEditor'

export default function ColumnsEditor(props) {

    const { selectedItem, isDragging, presentation, addToPresentation, selectComponent, component } = useContext(GlobalContext)
    
    const [dragEvent, setDragEvent] = useState(null);

    const handleOnDragOver = (event, id) => {
        setDragEvent(event)
    }

    const handleOnDragLeave = (event) => {
        setDragEvent(null)
    }

    const handleOnDrop = (event) => {
        event.preventDefault()
        if (event && selectedItem) {
            if (event.target.id.includes('placeholder')) {
                let id = event.target.id.split('placeholder-')[1];
                let childIndex = presentation.items.findIndex(el => el.id === id);
                
            }
           
            console.log(event)
           
        }
    }
   

    return (
        <div id={props.item.id} onDragOver={handleOnDragOver} onDragLeave={handleOnDragLeave}>
        
            {
                isDragging ? <div onDrop={handleOnDrop} id={`placeholder-${props.item.id}`}
                    className={`bg-indigo-100 ${dragEvent ? 'bg-opacity-10 border' : 'bg-opacity-0 border-0'} border-indigo-100 border-dashed`} style={{
                        minHeight: dragEvent ? 100 : 10,
                        transition: 'min-height .1s'
                    }}></div> : null
            }
        
        <div onDrop={handleOnDragLeave}
            onClick={() => selectComponent(props.item)}
            className={`cursor-default relative w-full ${component && props.item.id === component.id ? 'border-2 border-indigo-300 border-dashed rounded-sm' : ''} `}>
          
            <div className={props.item.classlist}>
                {
                    props.item.children && props.item.children.length > 0 && props.item.children.map((column, index) => {

                        return <div 
                            key={index} 
                            id={column.id} 
                            onDrop={handleOnDrop} 
                            className={`border border-gray-100 border-dashed ${column.classlist} ${dragEvent && dragEvent.target.id === column.id ? 'bg-indigo-100 bg-opacity-20 border-indigo-100': ''}`} 
                            onDragOver={(event) => handleOnDragOver(event, column.id)} 
                            onDragLeave={handleOnDragLeave} style={{ minHeight: column.children.length > 0 ? 'auto' : 200 }} >
                                {
                                    column.children && column.children.length > 0 && column.children.map((child, i) => {
                                        return <BlockEditor key={i} block={child} index={i} />
                                    })
                                }
                        </div>

                    })
                }
            </div>
           
        </div>
        </div>
    )
}
