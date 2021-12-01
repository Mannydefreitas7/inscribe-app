import React from 'react'
import { useDrop } from 'react-dnd';
import {  useDragLayer } from 'react-dnd';
import { useContext } from 'react';
import { GlobalContext } from '../store/GlobalState';
import { v4 } from 'uuid';
import localforage from 'localforage';



export default function DroppablePlaceholder(props) {

  const { loadPresentation, addComponent } = useContext(GlobalContext)
  const isDragging = useDragLayer(
    monitor => monitor.isDragging()
  );


  const handleOnDrop = async (item, type) => {
    let _presentation = await localforage.getItem('presentation');
    if (_presentation) {
      switch (type) {
        case 'ASSET':
            if (item.extension && item.items && item.items.length > 0) { 
                let items = item.items.map(i => {
                  return {
                    id: v4(),
                    ...i
                  }
                })
                if (_presentation && _presentation.items) {
                  _presentation.items.push(...items) 
                }
               
            } else { 
              item.id = v4() 
              let items = _presentation.items
              let i = items.findIndex(el => el.id === props.block.id)
              _presentation.items.splice(i, 0, item)
            }
          break;
            
          case 'COMPONENT':
            addComponent(item, _presentation)

          break;
      
        default:
          break;
          
      }
      loadPresentation(_presentation)
    }
    
  }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ['ASSET', 'COMPONENT'],
        drop: (item, monitor) => handleOnDrop(item, monitor.getItemType()),
        collect: (monitor) => ({
          isOver: monitor.isOver({shallow: true})
        })
      }))

    return (
        <div ref={drop}  id={`${props.type}-${props.id}`}>
          <div style={{ minHeight: 300, transition: 'all ease-in-out .2s' }}
            className={`${isDragging ? 'border-2' : 'border-2'} ${isOver ? 'bg-indigo-50 border-indigo-100 bg-opacity-50' : 'border-gray-100'} h-screen  border-dashed flex justify-center items-center`}>
              {/* <span className="text-gray-100">Drag and drop here.</span> */}
            </div>
        </div>
    )
}
