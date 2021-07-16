import React from 'react'


export default function SideBarRight(props) {
    
 
    return (
            <div className="relative bg-gray-50 border-l border-gray-100" 
            style={{ width: 350, paddingTop: 60 }}>
                {props.content}
            </div>
        
    )
}
