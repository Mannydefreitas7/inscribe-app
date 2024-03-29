import React from 'react'
import mepsaIcon from './../assets/icons/mepsa.svg';
import moreIcon from './../assets/icons/more.svg';
import ImageIcon from './../assets/icons/image.svg';


function RecentFile(props) {
    return (
        <div className="flex justify-between  items-center p-2 border-b border-gray-50 hover:bg-gray-100 rounded hover:bg-opacity-30 my-1">
            <div className="flex justify-start">
                <img src={props.type === 'MEPSA' ? mepsaIcon : ImageIcon} width="18" className="mr-2" alt=""/>
               
                     <div className="font-normal text-sm text-gray-600 ">{props.name.length > 15 ? `${props.name.substring(0, 18)}...` : props.name}</div>
                    {/* <div className="font-normal text-xs text-gray-400">{props.type}</div> */}
  
            </div>
            <img src={moreIcon} className="mr-2" alt="" />
        </div>
    )
}

export default RecentFile
