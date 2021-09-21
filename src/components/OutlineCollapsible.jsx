import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { GlobalContext } from '../store/GlobalState';
import ColumnsIcon from './../assets/icons/column.svg';
import ImageIcon from './../assets/icons/image.svg';
import TextIcon from './../assets/icons/text-block.svg';
import InsContextMenu from './modal/ContextMenu';
import TrashIcon from './../assets/icons/trash.svg';

export default function OutlineCollapsible(props) {

const [isOpen] = useState(false);
const { selectedItem, removeItem, presentation } = useContext(GlobalContext)
const buttons = [
    {
        label: 'Delete',
        icon: TrashIcon,
        action: (e, data) => {
            removeItem(props.item, presentation)
        }
    }
]
    return (
            <InsContextMenu id={props.item.id} buttons={buttons} >
        <div 
        className={`pl-2 rounded ${isOpen ? '' : 'hover:bg-gray-100 hover:bg-opacity-60'}  ${selectedItem && props.item.id === selectedItem.id && !isOpen ? 'bg-gray-100 cursor-move' : ''} bg-opacity-60`} {...props}>
            <div className="p-2 flex justify-between relative">
                <div className="inline-flex">

                    {
                        props.item.type.includes('column') ? <img src={ColumnsIcon} alt="columns" className="mr-3" /> : null
                    }

                    {
                        props.item.type.includes('text') || props.item.type.includes('container') ? <img src={TextIcon} alt="text" className="mr-3" /> : null
                    }

                    {
                        props.item.type.includes('image') ? <img src={ImageIcon} alt="" className="mr-3" /> : null
                    }
                   
                    <div className="leading-4">
                        <span className="text-gray-700 text-sm">{props.item.text}</span> <br />
                        <span className="text-gray-300 text-xs">{props.item.description}</span>
                    </div>
                </div>
                
                <button className='cursor-pointer'>{props.icon}</button>

                {

                }
            </div>
        </div>
        </InsContextMenu>
    )
}
