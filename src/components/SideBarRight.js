import React from 'react'


export default function SideBarRight(props) {
    
 
    return (
            <div className="fixed right-0 h-full z-10 bg-gray-50 border-l border-gray-100" 
            style={{ width: 350, paddingTop: 60 }}>
                {props.content}
            </div>
        
    )
}
