import React from 'react'
import CreateFileTemplate from '../components/CreateFileTemplate'
// import DropZoneFile from '../components/DropZoneFile'
// import TemplatesBar from '../components/sidebar/TemplatesBar'

function Home() {
    return (
        <div className="flex flex-row">
            {/* <TemplatesBar /> */}
            <div className="p-5 flex-grow pt-10">
            {/* <DropZoneFile name="file" style={{ minHeight: 200 }} /> */}
                <CreateFileTemplate />
             
            {/* <RecentContainer /> */}
            </div>
        </div>
    )
}

export default Home
