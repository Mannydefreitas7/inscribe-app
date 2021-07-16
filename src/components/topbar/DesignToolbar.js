import React, { useContext } from 'react'
import PhoneIcon from './../../assets/icons/phone.svg';
import DesktopIcon from './../../assets/icons/desktop.svg';
import TabletPortraitIcon from './../../assets/icons/tablet-portrait.svg';
import TabletLandscapeIcon from './../../assets/icons/tablet-landscape.svg';
import { GlobalContext } from '../../store/GlobalState';


function DesignToolbar() {

    const { breakpoint, changeBreakpoint } = useContext(GlobalContext);

    return (
        <div id="toolbar" className="flex px-2 flex-row">
            <button className={`p-2 mx-1 ql-bold rounded bg-gray-900 ${ breakpoint === 'desktop' ? 'bg-opacity-5' : 'bg-opacity-0' }  hover:bg-opacity-5`} onClick={() => changeBreakpoint('desktop')}>
                <img src={DesktopIcon} alt="button" style={{ height: 24 }}/>
            </button>

            <button className={`p-2 mx-1 ql-bold rounded bg-gray-900 ${ breakpoint === 'tablet-landscape' ? 'bg-opacity-5' : 'bg-opacity-0' }  hover:bg-opacity-5`} onClick={() => changeBreakpoint('tablet-landscape')}>
                <img src={TabletLandscapeIcon} alt="button" style={{ height: 24 }}/>
            </button>

            <button className={`p-2 mx-1 ql-bold rounded bg-gray-900 ${ breakpoint === 'tablet-portrait' ? 'bg-opacity-5' : 'bg-opacity-0' }  hover:bg-opacity-5`} onClick={() => changeBreakpoint('tablet-portrait')}>
                <img src={TabletPortraitIcon} alt="button" style={{ height: 24 }}/>
            </button>

            <button 
            className={`p-2 mx-1 ql-bold rounded bg-gray-900 ${ breakpoint === 'phone' ? 'bg-opacity-5' : 'bg-opacity-0' }  hover:bg-opacity-5`} onClick={() => changeBreakpoint('phone')}>
                 <img src={PhoneIcon} alt="button" style={{ height: 24 }}/>
            </button>
        </div>
    )
}

export default DesignToolbar
