import React from 'react'
import Collaspible from '../Collaspible'
import ComponentList from '../extensions/ComponentList'
import Properties from './Properties'


export default function SideBarRight() {
    return (
            <div className="fixed right-0 h-full z-10 bg-gray-50 border-l-2 border-gray-100" 
            style={{ minWidth: 320, paddingTop: 60 }}>
                

                <Collaspible title="Components" isOpen={false}> 
                    <ComponentList />
                </Collaspible>
                <Properties />
            </div>
        
    )
}
