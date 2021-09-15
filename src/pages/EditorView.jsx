import React, { useContext } from 'react'
import { GlobalContext } from '../store/GlobalState';

import SideBarLeft from '../components/sidebar/SideBarLeft';
import SideBarRight from '../components/sidebar/SideBarRight';
import { DndProvider } from 'react-dnd'
import InsModal from './../components/modal/InsModal';
import TopBar from '../components/topbar/TopBar';
import PrototypeNav from '../components/topbar/PrototypeNav';
import { HTML5Backend } from 'react-dnd-html5-backend';

function EditorView(props) {

    const { isLeftSidebarOpen, isRightSidebarOpen, isModalOpen } = useContext(GlobalContext);

    return (
        <>
             <DndProvider backend={HTML5Backend}>
                <div className="editor" >
                    <TopBar />
                    <div className="flex justify-between bg-gray-500 overflow-hidden">
                        {isLeftSidebarOpen ? <SideBarLeft /> : null}
                        {isLeftSidebarOpen ? <div style={{ minWidth: 320 }}></div> : null}
                        {props.children}
                        {isRightSidebarOpen ? <div style={{ minWidth: 320 }}></div> : null}
                        {isRightSidebarOpen ? <SideBarRight /> : null}

                    </div>
                </div>
            {
                isModalOpen ? <InsModal /> : null
            }
             </DndProvider>
              <PrototypeNav />
        </>
    )
}

export default EditorView
