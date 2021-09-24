import React from 'react'
import { useDrop } from 'react-dnd';
import {  useDragLayer } from 'react-dnd';
import { useContext } from 'react';
import { GlobalContext } from '../store/GlobalState';
import { v4 } from 'uuid';
import localforage from 'localforage';

export default function DroppableZone(props) {

  const { loadPresentation } = useContext(GlobalContext)
  const isDragging = useDragLayer(
    monitor => monitor.isDragging()
  );


  const handleOnDrop = async (item, type) => {
    let _presentation = await localforage.getItem('presentation');
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
          
        case 'BLOCK':
          let itemIndex = _presentation.items.findIndex(el => el.id === item.id);
          item.id = v4()
          let items = _presentation.items
          let i = items.findIndex(el => el.id === props.block.id)
          _presentation.items.splice(itemIndex, 1)
          _presentation.items.splice(i, 0, item)
        break;
    
      default:
        break;
        
    }
    loadPresentation(_presentation)
  }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ['ASSET', 'BLOCK'],
        drop: (item, monitor) => handleOnDrop(item, monitor.getItemType()),
        collect: (monitor) => ({
          isOver: monitor.isOver({shallow: true})
        })
      }))

      const setHeight = () => {
          if (isDragging) {
            if (isOver) {
              return props.children ? 50 : 100
            }
            return props.children ? 0 : 50
          }
          return 'auto'
      }

    return (
        <div ref={drop}  id={`${props.type}-${props.id}`}>
        <div style={{ minHeight: setHeight(), transition: 'all ease-in-out .2s' }}
          className={`${isDragging ? 'border-2' : ''} ${isOver ? 'bg-indigo-50 bg-opacity-50' : ''}  border-indigo-100 border-dashed`}></div>
          {props.children}
            {
                props.children && props.children.length > 0 ?
                <div style={{ minHeight: setHeight(), transition: 'all ease-in-out .2s', visibility: isOver ? 'visible' :'hidden' }}
                className={`${isDragging ? 'border-2' : ''} ${isOver ? 'bg-indigo-50 bg-opacity-50' : ''}  border-indigo-100 border-dashed`}></div> : null
            }  
        </div>
    )
}
