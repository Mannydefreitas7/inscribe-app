
import React, { useContext } from 'react'
import { GlobalContext } from '../store/GlobalState';
import AssetCollapsible from './AssetCollapsible';
import Collaspible from './Collaspible';
import DropZoneFile from './DropZoneFile';
import Nestable from 'react-nestable';
import ArrowDown from './../assets/icons/arrow-down.svg';
import OutlineCollapsible from './OutlineCollapsible';

export default function SideBarLeft() {

    const { presentation, loadPresentation } = useContext(GlobalContext);


    return (
        <div className="fixed h-full overflow-y-scroll z-10 bg-gray-50 border-r border-gray-100 overflow-x-hidden"
            style={{ width: 350, paddingTop: 60 }}>


            <Collaspible title="Assets" >

                <DropZoneFile />
                <div className="py-1" >

                    {
                        presentation && presentation.assets.map((asset, index) => {

                            return <AssetCollapsible key={index} item={asset} >
                                {
                                    asset.items && asset.items.length > 0 && asset.items.map((b, i) => {
                                        return <AssetCollapsible
                                            item={b}
                                            key={i}>
                                            {
                                                b.children && b.children.length > 0 && b.children.map((c, x) => {
                                                    return <AssetCollapsible
                                                        item={c}
                                                        key={x}></AssetCollapsible>
                                                })
                                            }
                                        </AssetCollapsible>
                                    })
                                }
                            </AssetCollapsible>

                        })
                    }

                </div>
            </Collaspible>
            {
                presentation && presentation.items.length > 0 ? <Collaspible title="Outline">
               
                    {
                        presentation && presentation.items.length > 0 ? 
                        <Nestable
                            items={presentation.items}
                            collapsed={true}
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
