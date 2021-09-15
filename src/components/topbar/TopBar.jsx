import React, { useContext } from 'react'
import { ReactSVG } from 'react-svg'
import { GlobalContext } from '../../store/GlobalState'
import AddView from './../modal/AddView';
import ArticleToolbar from './ArticleToolbar'
import DesignToolbar from './DesignToolbar';
import './../../pages/ArticleEditor.css';
import SideLeftIcon from './../../assets/icons/side-left.svg';
import SideRightIcon from './../../assets/icons/side-right.svg';

export default function TopBar() {

    const { workspace, selectItem, toggleLeftSidebar, toggleRightSidebar, isLeftSidebarOpen, isRightSidebarOpen, openModal } = useContext(GlobalContext);


    // const items = [
    //     {
    //         id: 0,
    //         icon: <img className="mr-3" width="20" src={InscribeIcon} alt="" />,
    //         text: 'Writing',
    //         disabled: false,
    //         action: () => changeWorkspace("article"),
    //         description: 'Includes article writing and editing tools'
    //     },
    //     {
    //         id: 1,
    //         icon: <img className="mr-3" width="20" src={PageFlowIcon} alt="" />,
    //         text: 'Design',
    //         action: () => changeWorkspace("presentation"),
    //         disabled: false,
    //         description: 'Digital content layout and presentation tools.'
    //     },
    // ]

    return (
        <div onClick={() => selectItem(null)} className="flex fixed w-full border-b-2 border-gray-100 px-4 flex-row justify-between py-2 z-50 bg-gray-50 ">
                    <button className={`p-2 rounded bg-gray-900 ${isLeftSidebarOpen ? 'bg-opacity-5' : 'bg-opacity-0'}  hover:bg-opacity-5`} onClick={() => toggleLeftSidebar(isLeftSidebarOpen)}>
                        <ReactSVG src={SideLeftIcon} />
                    </button>
                    {
                        workspace === 'presentation' ? <DesignToolbar /> : <ArticleToolbar />
                    }
                    <div className="flex items-center">
                        {/* <InsMenu items={items} title="Workspace">
                            <div className="hasDropdown p-2 rounded cursor-pointer bg-gray-900 bg-opacity-0 hover:bg-opacity-5">
                                <img style={{ float: 'left' }} src={workspace === "presentation" ? PageFlowIcon : InscribeIcon} alt="" />
                            </div>
                        </InsMenu> */}
                        <button className="p-2 rounded bg-gray-900 bg-opacity-0 hover:bg-opacity-5" onClick={(e) => {
                            console.log(e)
                            openModal(<AddView />, e.pageX - 400, e.pageY - 30)}}>
                            <ReactSVG src="/images/add.svg"/>
                        </button>
                        <button className={`p-2 mr-2 rounded bg-gray-900 ${isRightSidebarOpen ? 'bg-opacity-5' : 'bg-opacity-0'}  hover:bg-opacity-5`} onClick={() => toggleRightSidebar(isRightSidebarOpen)}>
                            <ReactSVG src={SideRightIcon} />
                        </button>
                    </div>
                </div>
    )
}
