import React, { useContext } from 'react'
import { GlobalContext } from '../store/GlobalState';

import SideBarLeft from '../components/sidebar/SideBarLeft';
import SideBarRight from '../components/sidebar/SideBarRight';
import { DndProvider } from 'react-dnd'
import InsModal from './../components/modal/InsModal';
import TopBar from '../components/topbar/TopBar';
import PresentationEditor from './PresentationEditor';
import PrototypeNav from '../components/topbar/PrototypeNav';
import { HTML5Backend } from 'react-dnd-html5-backend';

function EditorView(props) {

    const { isLeftSidebarOpen, isRightSidebarOpen, isModalOpen } = useContext(GlobalContext);

    return (
        <div>
             <DndProvider backend={HTML5Backend}>
                <div className="editor" >
                    <TopBar />
                    <div className="flex justify-between bg-gray-500 overflow-hidden">
                        {isLeftSidebarOpen ? <SideBarLeft /> : null}
                        {isLeftSidebarOpen ? <div style={{ width: 350 }}></div> : null}
                        {props.children}
                        {isRightSidebarOpen ? <div style={{ width: 350 }}></div> : null}
                        {isRightSidebarOpen ? <SideBarRight /> : null}

                    </div>
                </div>
            {
                isModalOpen ? <InsModal /> : null
            }
             </DndProvider>
              <PrototypeNav />
        </div>
    )
}

export default EditorView
