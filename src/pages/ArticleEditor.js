import React, { useContext, useEffect, useState } from 'react'
import ArticleToolbar from '../components/topbar/ArticleToolbar'
import { ReactSVG } from "react-svg";
import './ArticleEditor.css';
import SideLeftIcon from './../assets/icons/side-left.svg';
import SideRightIcon from './../assets/icons/side-right.svg';
import ContentEditable from "react-contenteditable";
import InsMenu from '../components/InsMenu';
import InscribeIcon from './../assets/icons/inscribe.svg';
import PageFlowIcon from './../assets/icons/pageflow.svg';
import { GlobalContext } from '../store/GlobalState';
import DesignToolbar from '../components/topbar/DesignToolbar';
import SideBarLeft from '../components/SideBarLeft';
import SideBarRight from '../components/SideBarRight';
import localforage from 'localforage';
import BlockEditor from '../components/BlockEditor';
import {
    DragDropContext,
    Droppable,
    Draggable
} from "react-beautiful-dnd";

function ArticleEditor() {

    const { workspace, changeWorkspace, breakpoint, toggleLeftSidebar, toggleRightSidebar, loadPresentation, presentation, isLeftSidebarOpen, isRightSidebarOpen, addToPresentation } = useContext(GlobalContext);

    useEffect(() => {
        localforage.config({
            driver: localforage.LOCALSTORAGE,
            name: 'inscribe',
            version: 1.0,
        });
        loadPresentation();
    }, []);

    const onDragEnd = async (result) => {
        try {
            const { source, destination, draggableId } = result;
            if (!destination) {
                return;
            }
            const destId = destination.droppableId;
            const srcId = source.droppableId;
            console.log(result)
            if (destId) {
                if (srcId === `droppable-assets`) {
                    filterAsset(draggableId)
                }
            }

        } catch (error) { console.log(error) }
    };


    const filterAsset = async (id) => {
        try {
            let _presentation = await localforage.getItem('presentation');
            if (_presentation) {
                let filteredItems = _presentation.assets.filter(item => item.id === id);
                if (filteredItems.length > 0) {
                    let items = filteredItems[0].items;
                    if (filteredItems[0].items && filteredItems[0].items.length > 0) {
                        addToPresentation(items)
                    } else {
                        addToPresentation([filteredItems[0]])
                    }
                    
                } 
            }
        } catch (error) {
            console.log(error)
        }
    }


    const items = [
        {
            id: 0,
            icon: <img className="mr-3" width="20" src={InscribeIcon} alt="" />,
            text: 'Writing',
            disabled: false,
            action: () => changeWorkspace("article"),
            description: 'Includes article writing and editing tools'
        },
        {
            id: 1,
            icon: <img className="mr-3" width="20" src={PageFlowIcon} alt="" />,
            text: 'Design',
            action: () => changeWorkspace("presentation"),
            disabled: false,
            description: 'Digital content layout and presentation tools.'
        },
    ]

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
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="editor">
                <div className="flex fixed w-full border-b border-gray-100 px-4 flex-row justify-between py-2 z-50 bg-gray-50 ">
                    <button className={`p-2 rounded bg-gray-900 ${isLeftSidebarOpen ? 'bg-opacity-5' : 'bg-opacity-0'}  hover:bg-opacity-5`} onClick={() => toggleLeftSidebar(isLeftSidebarOpen)}>
                        <ReactSVG src={SideLeftIcon} />
                    </button>
                    {
                        workspace === 'presentation' ? <DesignToolbar /> : <ArticleToolbar />
                    }
                    <div className="flex items-center">
                        <InsMenu items={items} title="Workspace">
                            <div className="hasDropdown p-2 rounded cursor-pointer bg-gray-900 bg-opacity-0 hover:bg-opacity-5">
                                <img style={{ float: 'left' }} src={workspace === "presentation" ? PageFlowIcon : InscribeIcon} alt="" />
                            </div>
                        </InsMenu>
                        <button className="p-2 rounded bg-gray-900 bg-opacity-0 hover:bg-opacity-5">
                            <ReactSVG
                                src="/images/add.svg"
                            />
                        </button>
                        <button className={`p-2 mr-2 rounded bg-gray-900 ${isRightSidebarOpen ? 'bg-opacity-5' : 'bg-opacity-0'}  hover:bg-opacity-5`} onClick={() => toggleRightSidebar(isRightSidebarOpen)}>
                            <ReactSVG src={SideRightIcon} />
                        </button>
                    </div>
                </div>

                <div className="flex justify-between bg-gray-200 overflow-hidden">

                    {isLeftSidebarOpen ? <SideBarLeft /> : null}

                    <div className={`bg-white h-screen flex-1 mx-auto ${breakpoint !== 'desktop' ? 'border-l-4 border-r-4 border-gray-200' : ''}`} style={{ maxWidth: setBreakPointWidth() }}>

                        <div className="container px-4 overscroll-contain mx-auto pb-24" style={{ paddingTop: workspace === 'presentation' ? 60 : 100, maxWidth: isLeftSidebarOpen || isRightSidebarOpen ? 600 : 1024 }} >
                            <Droppable
                                key={0}
                                ignoreContainerClipping={true}

                                droppableId={`droppable-document`}
                                isDropDisabled={false}
                            >
                                {(provided, snapshot) => (

                                    <div
                                        className={`${snapshot.isDraggingOver ? 'bg-indigo-50 rounded-sm' : ''}`}
                                        style={{ minHeight: presentation && presentation.items.length > 0 ? 'auto' : 800 }}
                                        ref={provided.innerRef}
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

                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                        </div>

                    </div>

                    {
                        isRightSidebarOpen ?
                            <SideBarRight content={<h1>TEST</h1>} /> :
                            null
                    }

                </div>


            </div>
        </DragDropContext>
    )
}
export default ArticleEditor
