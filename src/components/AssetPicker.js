import React, { useContext } from 'react'
import { GlobalContext } from '../store/GlobalState'
import AssetCollapsible from './AssetCollapsible'
import Collaspible from './Collaspible'
import DropZoneFile from './DropZoneFile'
import RecentFile from './RecentFile'

export default function AssetPicker() {
    const { presentation } = useContext(GlobalContext)
    return (
        <Collaspible title="Assets" isOpen={false}>
        <div>
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
        </div>
        </Collaspible>
    )
}
