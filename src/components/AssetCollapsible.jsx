import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { GlobalContext } from '../store/GlobalState';
import ArrowDown from './../assets/icons/arrow-down.svg'
import { useDrag } from 'react-dnd';
import MepsaIcon from './../assets/icons/mepsa.svg';


export default function AssetCollapsible(props) {

    const [isOpen, setIsOpen] = useState(false);
    const { selectedItem  } = useContext(GlobalContext);
    // eslint-disable-next-line
    const [{ opacity }, dragRef] = useDrag(() => ({
        type: 'ASSET',
        item: props.item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    return (
  
        <div className={`pl-2 rounded ${isOpen ? '' : 'hover:bg-gray-100 hover:bg-opacity-60 '}  ${selectedItem && props.item.id === selectedItem.id && !isOpen ? 'bg-gray-100' : 'cursor-move'} bg-opacity-60`} {...props} ref={!isOpen ? dragRef : null}>
            <div className="p-2 flex justify-between">

            <div className="flex items-center">

                        {
                            props.item.extension && props.item.extension.includes('MEPSA') ? <img src={MepsaIcon} alt="columns" className="mr-3" /> : null
                        }

                        {
                            props.item.type && props.item.type.includes('image') ? <img style={{ maxWidth: 30 }} src={props.item.blob} alt="columns" className="mr-3" /> : null
                        }


                    <div className="leading-4">
                        <span className="text-gray-700 text-sm">{props.item.text}</span> <br />
                        <span className="text-gray-300 text-xs">{props.item.description}</span>
                    </div>
                </div>


                {
                    props.item.type === 'container' || props.item.type === 'columns' ?
                    
                      
                        <button onClick={() => setIsOpen(!isOpen)} className="flex-grow">
                            <img src={ArrowDown} alt="" style={{
                                height: 24,
                                transform: `rotate(${isOpen ? '0' : '90'}deg)`,
                                transition: 'transform .3s'
                            }} />
                        </button> : null
                }

               

            </div>
            {
                isOpen ?
                    <div className="p-2">
                        {props.children}
                    </div> : null
            }
        </div>
    )
}
