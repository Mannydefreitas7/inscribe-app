import React, { useContext } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { GlobalContext } from '../store/GlobalState';
import BlockEditor from './BlockEditor'

export default function PresentationEditor() {

    const {  presentation  } = useContext(GlobalContext);
    return (
        <div className="container px-4 h-screen overflow-auto pb-24 mx-auto" style={{ paddingTop: 100, maxWidth: 1024 }} >
                            <Droppable
                                key={0}
                                ignoreContainerClipping={true}
                                droppableId={`droppable-document`}
                                isDropDisabled={false}
                            >
                                {(_provided, _snapshot) => (

                                    <div
                                        className={`${_snapshot.isDraggingOver ? 'bg-indigo-50 rounded-sm border border-dotted border-indigo-400' : ''}`}
                                        style={{ minHeight: 100 }}
                                        ref={_provided.innerRef}
                                    >
                                        {
                                            presentation && presentation.items.map((item, index) => {
                                                return <Draggable
                                                    key={index}
                                                    draggableId={`${item.id}`}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            
                                                        >
                                                            <BlockEditor snapshot={snapshot} block={item} />
                                                            
                                                        </div>
                                                        
                                                    )}
                                                </Draggable>
                                            })
                                        }
                                    </div>
                                )}
                            </Droppable>
                        </div>
    )
}
