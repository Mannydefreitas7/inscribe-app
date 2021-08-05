import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../store/GlobalState';

import SideBarLeft from '../components/SideBarLeft';
import SideBarRight from '../components/SideBarRight';
import localforage from 'localforage';
import { DndProvider } from 'react-dnd'
import InsModal from '../components/InsModal';
import TopBar from '../components/topbar/TopBar';
import PresentationEditor from '../components/PresentationEditor';
import PrototypeNav from '../components/topbar/PrototypeNav';
import { HTML5Backend } from 'react-dnd-html5-backend'
function ArticleEditor() {

    const { isLeftSidebarOpen, isRightSidebarOpen, isModalOpen, removeItem, selectedItem } = useContext(GlobalContext);
   

    useEffect(() => {
        localforage.config({
            driver: localforage.LOCALSTORAGE,
            name: 'inscribe',
            version: 1.0,
        });
       
        // shortcuts keys
        shortcurtMethods();

    },[]);

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


    return (
        <>
      
        <DndProvider backend={HTML5Backend} debugMode={true}>
            {/* <DragDropContext onDragEnd={onDragEnd}>  */}
                <div className="editor" >

                    <TopBar />
                    <div className="flex justify-between bg-gray-500 overflow-hidden">
                        {isLeftSidebarOpen ? <SideBarLeft /> : null}
                        {isLeftSidebarOpen ? <div style={{ width: 350 }}></div> : null}
                        <PresentationEditor />
                        {isRightSidebarOpen ? <div style={{ width: 350 }}></div> : null}
                        {isRightSidebarOpen ? <SideBarRight content={<h1>TEST</h1>} /> : null}

                    </div>
                </div>
             {/* </DragDropContext>  */}
            {
                isModalOpen ? <InsModal /> : null
            }
             </DndProvider>
           
              <PrototypeNav />
        </>
    )
}
export default ArticleEditor
