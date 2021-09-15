import React from 'react'
import { useDrop } from 'react-dnd';
import {  useDragLayer } from 'react-dnd';
import { useContext } from 'react';
import { GlobalContext } from '../store/GlobalState';
import localforage from 'localforage';


export default function DroppableZone(props) {

  const { presentation, loadPresentation } = useContext(GlobalContext)
  const isDragging = useDragLayer(
    monitor => monitor.isDragging()
  );

//   function array_move(arr, old_index, new_index) {
//     if (new_index >= arr.length) {
//         var k = new_index - arr.length + 1;
//         while (k--) {
//             arr.push(undefined);
//         }
//     }
//     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
//     return arr; // for testing
// };



  const handleOnDrop = async (item, type) => {

    let _presentation = await localforage.getItem('presentation');

    console.log(presentation)
    if (_presentation && item) {
      
        if (type === 'ASSET') { 

        if (props.type === 'block') {   
            let targetIndex = _presentation.items.findIndex(el => el.id === props.id);
            _presentation.items[targetIndex] = item;
            loadPresentation(_presentation);
        }

        if (props.type === 'top') {
          
          if (item.extension && item.extension === 'MEPSA') {
           
            console.log(_presentation)
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
