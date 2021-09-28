import React, { useContext } from 'react'
import { GlobalContext } from '../store/GlobalState';
import BlockEditor from '../components/BlockEditor'
import ColumnsEditor from '../components/ColumnsEditor';
import DroppableZone from '../components/DroppableZone';
import { useEffect } from 'react';
import localforage from 'localforage';
import './PresentationEditor.css';
import useEventListener from '../utils/useEventListener';

export default function PresentationEditor() {

    const { presentation, loadPresentation, breakpoint, changeWorkspace, selectedItem } = useContext(GlobalContext);
 
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
        changeWorkspace('presentation')
        load()
        // eslint-disable-next-line
    },[])



    useEventListener('keydown', (event) => {
        switch (event.key) {
            case 'Backspace': 
                if (selectedItem) {
                  //  removeItem(selectedItem, presentation)
                }
                break;
            default:
                break;
        }
    });

    const load = async () => {
        try {
            let presentation = await localforage.getItem('presentation');
            loadPresentation(presentation)   
        } catch (error) {
            console.log(error)
        } 
    }


    
    return (
        <div id="canvas"
        className={`bg-white flex-1 mx-auto ${breakpoint !== 'desktop' ? 'shadow-lg' : ''}`} style={{ maxWidth: setBreakPointWidth(), transition: 'max-width ease-in-out .2s' }}>
            <div className="container px-4 h-screen overflow-auto pb-24 mx-auto" 
                style={{ paddingTop: 100, maxWidth: 1024 }}>
                {
                    presentation && presentation.items.length > 0 ?
                    presentation.items.map((item, index) => (
                        <div key={item.id}>
                            <DroppableZone index={index} block={item}>
                                {
                                    item && item.type === 'columns' ? 
                                    <ColumnsEditor item={item} index={index} /> : 
                                    <BlockEditor block={item} index={index} />
                                }
                            </DroppableZone>
                        </div>
                    )) :
                    null
                }
                <DroppableZone />
            </div>
        </div>
    )
}
