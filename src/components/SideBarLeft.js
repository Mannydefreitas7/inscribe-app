
import React, { useContext } from 'react'
import { GlobalContext } from '../store/GlobalState';
import Collaspible from './Collaspible';
import DropZoneFile from './DropZoneFile';
import RecentFile from './RecentFile';
import {
    Droppable,
    Draggable
} from "react-beautiful-dnd";
import OutlineCollapsible from './OutlineCollapsible';

export default function SideBarLeft() {
   
    const { presentation, selectItem } = useContext(GlobalContext);

    return (
            <div className="fixed h-full overflow-scroll z-10 bg-gray-50 border-r border-gray-100" 
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
                                            
                                            <div className={`${snapshot.isDragging ? 'shadow-lg rounded bg-gray-50' : ''}cursor-move`} ref={provided.innerRef}
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
                    {
                        presentation && presentation.items.length > 0 && presentation.items.map((a, index) => {
                            return <OutlineCollapsible key={index} item={a} onClick={() => selectItem(a)}>
                                {
                                    a.children && a.children.length > 0 && a.children.map((b, i) => {
                                       return <OutlineCollapsible 
                                       item={b}
                                       key={i}>
                                           {
                                               b.children && b.children.length > 0 && b.children.map((c, x) => {
                                                return <OutlineCollapsible 
                                                item={c}
                                                key={x}></OutlineCollapsible>
                                               })
                                           }
                                       </OutlineCollapsible>
                                    })
                                }
                            </OutlineCollapsible>
                        })
                    }
                </Collaspible> 
            </div>
        
    )
}
