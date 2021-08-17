import React, { useContext } from 'react'
import Nestable from 'react-nestable'
import { GlobalContext } from '../../store/GlobalState';
import Collaspible from '../Collaspible'
import OutlineCollapsible from '../OutlineCollapsible'
import ArrowDown from './../../assets/icons/arrow-down.svg';

function PresentationOutline() {

    const { presentation, loadPresentation } = useContext(GlobalContext);


    return (
        <div>
            {
                presentation && presentation.items.length > 0 ? <Collaspible title="Outline">
               
                    {
                        presentation && presentation.items.length > 0 ? 
                        <Nestable
                            items={presentation.items}
                            collapsed={true}
                            maxDepth={4}
                            onChange={({items}) => {
                                presentation.items = items
                                loadPresentation(presentation)
                            }}
                            renderCollapseIcon={(collapseIcon) => <img src={ArrowDown} alt="" style={{  
                                width: 24,
                                transform: `rotate(${ !collapseIcon.isCollapsed ? '0' : '90' }deg)`,
                                transition: 'transform .3s'
                            }} />}
                            renderItem={({item, collapseIcon}) => <OutlineCollapsible item={item} icon={collapseIcon} />}
                      /> : null
                    }

                </Collaspible> : null
            }

        </div>
    )
}

export default PresentationOutline
