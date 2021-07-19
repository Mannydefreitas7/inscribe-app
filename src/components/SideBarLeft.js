
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../store/GlobalState';
import Collaspible from './Collaspible';
import DropZoneFile from './DropZoneFile';
import RecentFile from './RecentFile';
import {
    Droppable,
    Draggable
} from "react-beautiful-dnd";

export default function SideBarLeft() {
   
    const { presentation } = useContext(GlobalContext);

    return (
            <div className="fixed h-full z-10 bg-gray-50 border-r border-gray-100" 
            style={{ width: 350, paddingTop: 60 }}>
               
                <Collaspible title="Assets" >

                    <DropZoneFile  />
                    <div className="py-1"> 

                    <Droppable key={0} droppableId={`droppable-assets`} isDropDisabled={true}>
                            {(provided, snapshot) => (
                                <div className="" ref={provided.innerRef}>
                                    {
                                        presentation && presentation.assets.map((asset, index) => {

                                            return <Draggable key={index} draggableId={`${asset.id}`} index={index}>
                                            {(provided, snapshot) => (
                                            
                                            <div className={`${snapshot.isDragging ? 'shadow-lg rounded bg-gray-50' : ''}`} ref={provided.innerRef}
                                             {...provided.draggableProps}
                                             {...provided.dragHandleProps}><RecentFile type={asset.extension} name={asset.name} date={asset.date} /></div>
                                            )}</Draggable>
                                        })
                                    }
                                     {provided.placeholder}
                               </div>             
                                            
                            )} 
                        
                    </Droppable>
                    </div>
                </Collaspible>
                <Collaspible title="Outline" >
                    <span>Outline</span>
                </Collaspible> 
            </div>
        
    )
}
