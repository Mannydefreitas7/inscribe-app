import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../store/GlobalState';

import SideBarLeft from '../components/SideBarLeft';
import SideBarRight from '../components/SideBarRight';
import localforage from 'localforage';
import BlockEditor from '../components/BlockEditor';
import {
    DragDropContext,
    Droppable,
    Draggable
} from "react-beautiful-dnd";
import InsModal from '../components/InsModal';
import TopBar from '../components/topbar/TopBar';
import PresentationEditor from '../components/PresentationEditor';

function ArticleEditor() {

    const {  breakpoint, loadPresentation, presentation, isLeftSidebarOpen, isRightSidebarOpen, addToPresentation, isModalOpen, removeItem, selectedItem } = useContext(GlobalContext);

    useEffect(() => {
        localforage.config({
            driver: localforage.LOCALSTORAGE,
            name: 'inscribe',
            version: 1.0,
        });
        loadPresentation();

        // shortcuts keys
        shortcurtMethods();

    }, []);

    const shortcurtMethods = () => {
        document.onkeyup = function (e) {
            var evt = window.event || e;
            console.log(evt)
            switch (evt.keyCode) {
                // delete
                case 8:  
                    if (selectedItem) removeItem(selectedItem)
                    break;
                default:
                    break;
            }
        }
    }

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
                    filterAsset(draggableId, destination.index)
                }
            }

        } catch (error) { console.log(error) }
    };

  


    const filterAsset = async (id, index) => {
        try {
            let _presentation = await localforage.getItem('presentation');
            if (_presentation) {
                let assetItems = _presentation.assets.filter(item => item.id === id);
                
                if (assetItems.length > 0) {
                    let presentationItems = _presentation.items;
                    
                    let items = assetItems[0].items;
                    if (assetItems[0].items && assetItems[0].items.length > 0) {
                        addToPresentation([
                            ...presentationItems,
                            ...items
                        ])
                    } else {
                        if (presentationItems.length > 0) {
                            
                            presentationItems.splice(index, 0, assetItems[0])
                            addToPresentation(presentationItems)
                        } else {
                            addToPresentation([assetItems[0]])
                        }
                        
                        
                    }
                } 
            }
        } catch (error) {
            console.log(error)
        }
    }



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
        <>
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="editor">
                <TopBar />

                <div className="flex justify-between bg-gray-500 overflow-hidden">

                    {isLeftSidebarOpen ? <SideBarLeft /> : null}
                    {isLeftSidebarOpen ? <div style={{ width: 350 }}></div> : null}
                    <div className={`bg-white flex-1 mx-auto ${breakpoint !== 'desktop' ? 'border-l-4 border-r-4 border-gray-200' : ''}`} style={{ maxWidth: setBreakPointWidth() }}>

                        <PresentationEditor />

                    </div>
                    { isRightSidebarOpen ? <div style={{ width: 350 }}></div> : null}                  
                    { isRightSidebarOpen ? <SideBarRight content={<h1>TEST</h1>} /> : null}
                                            
                </div>


            </div>
        </DragDropContext>
        {
            isModalOpen ? <InsModal /> : null
        }
        </>
    )
}
export default ArticleEditor
