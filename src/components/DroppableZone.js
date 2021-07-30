import React from 'react'
import { useDrop } from 'react-dnd';
import {  useDragLayer } from 'react-dnd';
import { useContext } from 'react';
import { GlobalContext } from '../store/GlobalState';
import { ReactSVG } from 'react-svg';
import AddView from './AddView';
import PlusIcon from './../assets/icons/plus-white.svg';

export default function DroppableZone(props) {

  const { presentation, loadPresentation } = useContext(GlobalContext)
  const isDragging = useDragLayer(
    monitor => monitor.isDragging()
  );

  function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};



  const handleOnDrop = async (item, type) => {
  
    if (presentation && item) {

        if (type === 'ASSET') { 

        if (props.type === 'block') {   
            let targetIndex = presentation.items.findIndex(el => el.id === props.id);
            presentation.items[targetIndex] = item;
            return loadPresentation(presentation);
        }

        if (props.type === 'top') {

          if (item.extension && item.extension === 'MEPSA') {
              presentation.items = [
                ...item.children,
                ...presentation.items
              ]
          } else {
              presentation.items = [
                item,
                ...presentation.items
              ]
          }
            return loadPresentation(presentation);
        }

        if (props.type === 'bottom') {   
            presentation.items = [
              ...presentation.items,
              item
            ]
          return loadPresentation(presentation);
        }

        // if (props.type === 'column' && props.parent) {
        //     let columnsIndex = presentation.items.findIndex(el => el.id === props.parent.id);
        //     let columns = props.parent;
        //     let columnIndex = columns.children.findIndex(el => el.id === props.id);
        //     columns.children[columnIndex].children.push(item);
        //     return setTimeout(() => addToPresentation(columns, columnsIndex, columnIndex), 500)
        // }

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
              className={`${isDragging ? 'border' : ''} ${isOver ? 'bg-indigo-50 bg-opacity-50' : ''}  border-indigo-100 border-dashed`}
            >{props.children}</div> :
            <div 
                ref={drop}
                id={`${props.type}-placeholder`} 
                style={{ minHeight: isDragging ? 50 : 0, height: isOver ? 150 : 'auto', transition: 'all ease-in-out .2s' }}
                className={`relative ${isDragging ? 'border' : ''} ${isOver ? 'bg-indigo-50 bg-opacity-50' : ''}  border-indigo-100 border-dashed`}
            ></div>
        }
    </>
      
        
    )
}
