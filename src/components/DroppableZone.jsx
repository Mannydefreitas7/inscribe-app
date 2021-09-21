import React from 'react'
import { useDrop } from 'react-dnd';
import {  useDragLayer } from 'react-dnd';
import { useContext } from 'react';
import { GlobalContext } from '../store/GlobalState';
import localforage from 'localforage';
import { v4 } from 'uuid';

export default function DroppableZone(props) {

  const { loadPresentation } = useContext(GlobalContext)
  const isDragging = useDragLayer(
    monitor => monitor.isDragging()
  );


  const handleOnDrop = async (item, type) => {
    item.id = v4()
    let _presentation = await localforage.getItem('presentation');
    if (_presentation && item) {
      
        if (type === 'ASSET') { 

        if (props.type === 'block') {   
            let targetIndex = _presentation.items.findIndex(el => el.id === props.id);
            _presentation.items[targetIndex] = item;
            loadPresentation(_presentation);
        }

        if (props.type === 'top') {
          
          if (item.extension && item.extension === 'MEPSA') {

            _presentation.items = [
                ...item.items,
                ..._presentation.items
              ]

          } else {
            _presentation.items.unshift(item)
          }
            loadPresentation(_presentation);
        }

        if (props.type === 'bottom') {   
          _presentation.items = [
              ..._presentation.items,
              item
            ]
          loadPresentation(_presentation);
        }
        }
    } 
  }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ['ASSET', 'ITEM'],
        drop: (item, monitor) => handleOnDrop(item, monitor.getItemType()),
        collect: (monitor) => ({
          isOver: monitor.isOver()
        })
      }))

    return (
    <>
        {
            props.children ? <div 
              ref={drop}
              id={`${props.type}-${props.id}`} 
              style={{ height: isOver ? 200 : 'auto', transition: 'all ease-in-out .2s' }}
              className={`${isDragging ? 'border-2' : ''} ${isOver ? 'bg-indigo-50 bg-opacity-50' : ''}  border-indigo-100 border-dashed`}
            >{props.children}</div> :
            <div 
                ref={drop}
                id={`${props.type}-placeholder`} 
                style={{ minHeight: isDragging ? 50 : 0, height: isOver ? 150 : 'auto', transition: 'all ease-in-out .2s' }}
                className={`relative ${isDragging ? 'border-2' : ''} ${isOver ? 'bg-indigo-50 bg-opacity-50' : ''}  border-indigo-100 border-dashed`}
            ></div>
        }
    </>
      
        
    )
}
