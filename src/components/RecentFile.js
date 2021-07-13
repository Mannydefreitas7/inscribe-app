import React from 'react'
import mepsaIcon from './../assets/icons/mepsa.svg';
import moreIcon from './../assets/icons/more.svg';

function RecentFile(props) {
    return (
        <div className="flex justify-between items-center py-2 px-4 border-b border-gray-50 hover:bg-gray-100 rounded hover:bg-opacity-30">
            <div className="flex content-center">
                <img src={mepsaIcon} width="24" className="mr-2" alt=""/>
                <div>
                    <span className="ml-2 font-normal text-gray-600">{props.name}</span> <br />
                    <span className="ml-2 font-normal text-sm text-gray-400">{props.type}</span>
                </div>
               
            </div>

            <div className="flex content-center">
                <span className="mr-4 text-gray-300">{props.date}</span>
                <img src={moreIcon} width="24" className="mr-2" alt="" />
            </div>
        </div>
    )
}

export default RecentFile
