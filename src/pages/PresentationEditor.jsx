import React, { useContext } from 'react'
import { GlobalContext } from '../store/GlobalState';
import BlockEditor from '../components/BlockEditor'
import ColumnsEditor from '../components/ColumnsEditor';
import PlaceholderEditor from './PlaceholderEditor';
import DroppableZone from '../components/DroppableZone';
import { useEffect } from 'react';
import localforage from 'localforage';
import './PresentationEditor.css';

export default function PresentationEditor() {

    const { presentation, loadPresentation, breakpoint } = useContext(GlobalContext);
 
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

    useEffect(() => {
        localforage.getItem('presentation')
        .then(presentation => {
            loadPresentation(presentation);
        })
    },[])

    return (
        <div 
        id="canvas"
        className={`bg-white flex-1 mx-auto ${breakpoint !== 'desktop' ? 'border-l-4 border-r-4 border-gray-200' : ''}`} style={{ maxWidth: setBreakPointWidth(), transition: 'max-width ease-in-out .2s' }}>
            <div className="container px-4 h-screen overflow-auto pb-24 mx-auto" style={{ paddingTop: 100, maxWidth: 1024 }}  >
                <DroppableZone type="top"/>
           
                {
                    presentation && presentation.items.map((item, index) => {  
                        return <div key={index}>
                                {
                                    item && item.type === 'columns' ? 
                                    <ColumnsEditor item={item} /> : 
                                    <BlockEditor block={item} index={index} />
                                }
                            
                        </div>
                    })
                }

                {
                    presentation && presentation.items.length > 0 ? <DroppableZone type="bottom"/> : null
                }
                
            </div>
        </div>
    )
}
