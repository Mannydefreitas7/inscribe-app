import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { GlobalContext } from '../store/GlobalState';
import ArrowDown from './../assets/icons/arrow-down.svg'
import DraggableItem from './DraggableItem';

export default function AssetCollapsible(props) {

const [isOpen, setIsOpen] = useState(false);
const { selectedItem, selectItem, handleOnDrag } = useContext(GlobalContext)

    return (
        <DraggableItem onDrag={(e) => {
            handleOnDrag(e)
            if (!isOpen) {
                selectItem(props.item)
            }
        }} onClick={() => {
            if (!isOpen) {
                selectItem(props.item)
            }
        }} key={props.index} draggable={!isOpen} className={`bg-gray-50 ${isOpen ? 'cursor-pointer' : 'cursor-move'} w-full`}>
        <div className={`pl-2 rounded ${isOpen ? '' : 'hover:bg-gray-100 hover:bg-opacity-60'}  ${selectedItem && props.item.id === selectedItem.id && !isOpen ? 'bg-gray-100' : ''} bg-opacity-60`} {...props}>
            <div className="p-2 flex justify-between">
                <div className="leading-4">
                    <span className="text-gray-700 text-sm">{props.item.data}</span> <br />
                    <span className="text-gray-300 text-xs">{props.item.description}</span>
                </div>
                {
                    props.item.type === 'container' || props.item.type === 'columns' ?
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <img src={ArrowDown} alt="" style={{ 
                            width: 24, 
                            transform: `rotate(${ isOpen ? '0' : '90' }deg)`,
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
        </DraggableItem>
    )
}
