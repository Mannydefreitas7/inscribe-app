import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../store/GlobalState';

import SideBarLeft from '../components/SideBarLeft';
import SideBarRight from '../components/SideBarRight';
import localforage from 'localforage';
import {
    DragDropContext,
} from "react-beautiful-dnd";
import { DndProvider } from 'react-dnd'
import InsModal from '../components/InsModal';
import TopBar from '../components/topbar/TopBar';
import PresentationEditor from '../components/PresentationEditor';
import PrototypeNav from '../components/topbar/PrototypeNav';
import { HTML5Backend } from 'react-dnd-html5-backend'
function ArticleEditor() {

    const { loadPresentation, isLeftSidebarOpen, isRightSidebarOpen, addToPresentation, isModalOpen, removeItem, selectedItem, toggleDragging } = useContext(GlobalContext);
   

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

                    let items = assetItems[0];
                    addToPresentation(items, index)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <PrototypeNav />

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="editor" onDragStart={() => toggleDragging(true)} onDragEnd={() => toggleDragging(false) } >
                    <TopBar />
                    <div className="flex justify-between bg-gray-500 overflow-hidden">

                        {isLeftSidebarOpen ? <SideBarLeft /> : null}
                        {isLeftSidebarOpen ? <div style={{ width: 350 }}></div> : null}
                        <PresentationEditor />
                        {isRightSidebarOpen ? <div style={{ width: 350 }}></div> : null}
                        {isRightSidebarOpen ? <SideBarRight content={<h1>TEST</h1>} /> : null}

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
