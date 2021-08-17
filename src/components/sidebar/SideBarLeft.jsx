
import React, { useContext } from 'react'
import { GlobalContext } from './../../store/GlobalState';
import AssetCollapsible from './../AssetCollapsible';
import Collaspible from './../Collaspible';
import DropZoneFile from './../DropZoneFile';
import ArticleOutline from './ArticleOutline';
import PresentationOutline from './PresentationOutline';


export default function SideBarLeft() {

    const { presentation, loadPresentation, workspace } = useContext(GlobalContext);


    return (
        <div className="fixed h-full z-10 bg-gray-50 border-r border-gray-100 overflow-x-hidden"
            style={{ width: 350, paddingTop: 60 }}>
            
            {
                workspace === 'presentation' ?
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
            </Collaspible> : null

            }

            {
                workspace === 'presentation' ?
                <PresentationOutline /> : <ArticleOutline />
            }

        </div>

    )
}
