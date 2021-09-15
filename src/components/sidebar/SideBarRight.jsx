import React from 'react'
import Properties from './Properties'


export default function SideBarRight() {
    return (
            <div className="fixed right-0 h-full z-10 bg-gray-50 border-l border-gray-100" 
            style={{ minWidth: 320, paddingTop: 60 }}>
                <Properties />
            </div>
        
    )
}
