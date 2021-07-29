
import React, { useContext } from 'react'
import { GlobalContext } from '../store/GlobalState';
import AssetCollapsible from './AssetCollapsible';
import Collaspible from './Collaspible';
import DropZoneFile from './DropZoneFile';
import OutlineCollapsible from './OutlineCollapsible';

export default function SideBarLeft() {

    const { presentation } = useContext(GlobalContext);


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
                        presentation && presentation.items.length > 0 && presentation.items.map((a, index) => {
                            return <OutlineCollapsible key={index} item={a}>
                                {
                                    a.children && a.children.length > 0 && a.children.map((b, i) => {
                                        return <OutlineCollapsible
                                            item={b}
                                            key={i}>
                                            {
                                                b.children && b.children.length > 0 && b.children.map((c, x) => {
                                                    return <OutlineCollapsible
                                                        item={c}
                                                        key={x}></OutlineCollapsible>
                                                })
                                            }
                                        </OutlineCollapsible>
                                    })
                                }
                            </OutlineCollapsible>
                        })
                    }
                </Collaspible> : null
            }


        </div>

    )
}
