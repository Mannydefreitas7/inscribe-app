import React, { useContext } from 'react'
import { GlobalContext } from '../store/GlobalState'
import Collaspible from './Collaspible'
import DropZoneFile from './DropZoneFile'
import RecentFile from './RecentFile'

export default function AssetPicker() {
    const { presentation } = useContext(GlobalContext)
    return (
        <Collaspible title="Assets" isOpen={false}>
        <div>
            <DropZoneFile />
            {
                presentation && presentation.assets.map((asset, index) => {
                    return (
                    <RecentFile key={index} type={asset.extension} name={asset.name} date={asset.date} />
                    )
                })
            }
        </div>
        </Collaspible>
    )
}
