
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
import TOCView from './TOCView';

export default function SideBarLeft() {
   
    const { presentation, selectItem } = useContext(GlobalContext);

    return (
            <div className="fixed h-full overflow-scroll z-10 bg-gray-50 border-r border-gray-100" 
            style={{ width: 400, paddingTop: 60 }}>

                {
                    presentation && presentation.toc.length > 0 ? <TOCView /> : null
                }
                
               
                <Collaspible title="Assets" >

                    <DropZoneFile  />
                    <div className="py-1"> 

                    <Droppable key={0} droppableId={`droppable-assets`} isDropDisabled={true}>
                            {(_provided, _snapshot) => (
                                <div className="" ref={_provided.innerRef}>
                                    {
                                        presentation && presentation.assets.map((asset, index) => {

                                            return <Draggable key={index} draggableId={`${asset.id}`} index={index}>
                                            {(provided, snapshot) => (
                                            
                                            <div className={` bg-gray-50 ${snapshot.isDragging ? 'shadow-lg rounded' : ''}cursor-move w-full`} ref={provided.innerRef}
                                             {...provided.draggableProps}
                                             {...provided.dragHandleProps}><RecentFile type={asset.extension} name={asset.name} date={asset.date} /></div>
                                            )}</Draggable>
                                        })
                                    }
                                     {_provided.placeholder}
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
