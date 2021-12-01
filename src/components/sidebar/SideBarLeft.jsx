
import React, { useContext } from 'react'
import { GlobalContext } from './../../store/GlobalState';
import AssetCollapsible from './../AssetCollapsible';
import Collaspible from './../Collaspible';
import DropZoneFile from './../DropZoneFile';
import ArticleOutline from './ArticleOutline';
import PresentationOutline from './PresentationOutline';


export default function SideBarLeft() {

    const { presentation, workspace } = useContext(GlobalContext);


    return (
        <div className="fixed h-full z-10 bg-gray-50 border-r-2 border-gray-100 overflow-x-hidden"
            style={{ width: 320, paddingTop: 60 }}>
            


            {
                workspace === 'presentation' ?
                <PresentationOutline /> : <ArticleOutline />
            }

            {
                workspace === 'presentation' ?
                <Collaspible title="Assets" isOpen={true} >

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
                                                b.items && b.items.length > 0 && b.items.map((c, x) => {
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
            </Collaspible> : null

            }

        </div>

    )
}
