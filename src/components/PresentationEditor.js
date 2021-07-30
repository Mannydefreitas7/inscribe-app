import React, { useContext } from 'react'
import { GlobalContext } from '../store/GlobalState';
import BlockEditor from './BlockEditor'
import ColumnsEditor from './ColumnsEditor';

import PlaceholderEditor from './PlaceholderEditor';

export default function PresentationEditor() {

    const { presentation, breakpoint, handleOnDrag, toggleDragging, selectItem, selectComponent } = useContext(GlobalContext);
 
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
        <div 
        onDragOver={handleOnDrag}
        onClick={(event) => {
            if (event.target.id === 'canvas')
            selectItem({id: ""})
        }}
        id="canvas"
        className={`bg-white flex-1 mx-auto ${breakpoint !== 'desktop' ? 'border-l-4 border-r-4 border-gray-200' : ''}`} style={{ maxWidth: setBreakPointWidth() }}>
            <div className="container px-4 h-screen overflow-auto pb-24 mx-auto" style={{ paddingTop: 100, maxWidth: 1024 }}  >
                {
                    presentation && presentation.items.map((item, index) => {  
                        return <div key={index} draggable={item.type === 'columns' ? false : true}>
                            {
                                item.type === 'columns' ? <ColumnsEditor item={item} /> : <BlockEditor block={item} index={index} />
                            }
                        </div>
                    })
                }
                <PlaceholderEditor />   
            </div>
        </div>
    )
}
