import React, { useContext } from 'react'
import { ReactSVG } from 'react-svg';
import { GlobalContext } from '../store/GlobalState';
import AddView from './../components/modal/AddView';
import { useDrop } from 'react-dnd'
import PlusIcon from './../assets/icons/plus-white.svg';
import { useEffect } from 'react';

export default function PlaceholderEditor() {
    const { selectedItem, openModal, selectItem, addToPresentation } = useContext(GlobalContext);


    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'ASSET',
        drop: (item, monitor) => {   
            return addToPresentation(item, 0)
        },
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        })
      }))

    
    return (
        <div ref={drop}> 
                <div onClick={() => selectItem({id: 'placeholder'})} id="placeholder" className={`relative border border-gray-100 border-dashed ${isOver ? 'bg-indigo-100 bg-opacity-20 border-indigo-100': ''} h-32 ${selectedItem && selectedItem.id === "placeholder" ? 'border-2 mb-3 border-indigo-300' : 'border-0 mb-0'}`} >
                    {
                    selectedItem && selectedItem.id === "placeholder" ?
                        <div className="absolute bottom-1/2 left-1/2 p-1 transform -translate-x-1/2 translate-y-1/2 bg-indigo-600 rounded inline-flex items-center justify-center z-20">
                            <button className="p-1 hover:bg-indigo-700 rounded" onClick={() => openModal(<AddView />)}>
                                <ReactSVG src={PlusIcon} />
                            </button>
                        </div> : null
                    }
                </div> 
        </div>
    )
}
