import React, { useContext } from 'react';
import ImageIcon from "./../assets/icons/image.svg";
import { useDrop } from 'react-dnd';
import { GlobalContext } from '../store/GlobalState';

export default function DropZoneImage(props) {

      const { loadPresentation, presentation } = useContext(GlobalContext)
      const [dropImageCollected, dropImageBoxRef] = useDrop(() => ({
       
        accept: ['ASSET'],
        drop: (item, monitor) => {
            let index = presentation.items.findIndex(el => el.id === props.block.id);
              presentation.items[index] = item
              loadPresentation(presentation)
        },
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        })
      }))


    return (
        <div ref={dropImageBoxRef}>
            <div
                style={{ height: 250 }} 
                className={`bg-opacity-10 inline-flex justify-center w-full items-center border-2 border-dashed ${dropImageCollected.isOver ? 'bg-indigo-100 border-indigo-300' : 'bg-gray-100 border-gray-100'}`}>
                     <div className="flex justify-center flex-col items-center flex-wrap self-center">
                        <img src={ImageIcon} width="32" className="my-4 opacity-30" alt="" />
                        <p
                        className={`self-center text-gray-300  text-center`}>
                            Drop image here. <br />
                        </p>
                     </div>
                </div>
        </div>
    )
}
