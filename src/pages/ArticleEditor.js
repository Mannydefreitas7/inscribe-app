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

    const { loadPresentation, isLeftSidebarOpen,  presentation, isRightSidebarOpen, addToPresentation, isModalOpen, removeItem, selectedItem, toggleDragging } = useContext(GlobalContext);
   

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


    const handleOnDrop = async (event) => {
        //  event.preventDefault()

        console.log(event)
        var _presentation,
        id,
        item;

        _presentation = await localforage.getItem('presentation')
        id = event.target.id;
        item = JSON.parse(event.dataTransfer.getData('application/json'));

        if (_presentation && item) {

            if (event.dataTransfer.dropEffect === 'move') {
                if (_presentation && _presentation.items.length > 0) {
                    _presentation.items = [
                        ..._presentation.items.filter(el => el.id !== item.id)
                    ]
                }
            }

            if (id === 'placeholder') {
                _presentation.items.push(item);
                localforage.setItem('presentation', _presentation);
                return loadPresentation()
            } 
            if (id.includes('block-placeholder')) {
                
                let blockId = event.target.id.split('block-placeholder-')[1];
                let index = presentation.items.findIndex(el => el.id === blockId);
                if (item) {  
                    setTimeout(() => addToPresentation(item, index), 200);
                }
        
            }

            if (id.includes('column')) {
                let columnId = event.target.id.split('column-')[1];

            }

        }
    
          
      }



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

            {/* <DragDropContext onDragEnd={onDragEnd}> */}
                <div className="editor" 
                onDragStart={(event) => {
                    event.dataTransfer.setData('application/json', JSON.stringify(selectedItem))
                    toggleDragging(true)
                    }} 
                    onDrop={handleOnDrop}
                onDragEnd={() => toggleDragging(false) }>

                    <TopBar />
                    <div className="flex justify-between bg-gray-500 overflow-hidden">
                        {isLeftSidebarOpen ? <SideBarLeft /> : null}
                        {isLeftSidebarOpen ? <div style={{ width: 350 }}></div> : null}
                        <PresentationEditor />
                        {isRightSidebarOpen ? <div style={{ width: 350 }}></div> : null}
                        {isRightSidebarOpen ? <SideBarRight content={<h1>TEST</h1>} /> : null}

                    </div>
                </div>
            {/* </DragDropContext> */}
          
            {
                isModalOpen ? <InsModal /> : null
            }
        </>
    )
}
export default ArticleEditor
