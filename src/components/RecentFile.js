import React from 'react'
import DocumentIcon from './../assets/icons/DocumentIcon'
import MoreIcon from './../assets/icons/MoreIcon'

function RecentFile(props) {
    return (
        <div className="flex justify-between py-4 px-4 border-b hover:bg-gray-200">
            <div className="flex content-center">
                <DocumentIcon />
                <span className="ml-2 font-semibold">{props.name}</span>
            </div>

            <div className="flex content-center">
                <span className="mr-4 text-gray-400">{props.date}</span>
                <MoreIcon />
            </div>
        </div>
    )
}

export default RecentFile
