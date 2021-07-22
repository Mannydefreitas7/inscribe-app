import React, { useContext } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { GlobalContext } from '../store/GlobalState';
import useQuery from '../utils/functions';
import BlockEditor from './BlockEditor'

export default function PresentationEditor() {

    const { presentation, breakpoint } = useContext(GlobalContext);
    let query = useQuery();
    const setBreakPointWidth = () => {
        switch (breakpoint) {
            case "desktop":
                return "100%";
            case "tablet-portrait":
                return 767;
            case "tablet-landscape":
                return 1024;
            case "phone":
                return 425;
            default:
                return "100%";
        }
    }
    return (
        <div className={`bg-white flex-1 mx-auto ${breakpoint !== 'desktop' ? 'border-l-4 border-r-4 border-gray-200' : ''}`} style={{ maxWidth: setBreakPointWidth() }}>
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
                                !query.get('articleId') && presentation && presentation.items.map((item, index) => {
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

                        {
                                query.get('articleId') && presentation && presentation.toc.filter(article => article.id === query.get('articleId')).length > 0 && presentation.toc.filter(article => article.id === query.get('articleId'))[0].items.map((item, index) => {
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
        </div>
    )
}
