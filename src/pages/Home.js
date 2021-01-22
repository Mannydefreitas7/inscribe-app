import React from 'react'
import DropZoneFile from '../components/DropZoneFile'
import RecentContainer from '../components/RecentContainer'
import TemplatesBar from '../components/sidebar/TemplatesBar'

function Home() {
    return (
        <div className="flex flex-row">
            <TemplatesBar />
            <div className="p-5 flex-grow pt-10">
            <DropZoneFile name="file" />
            <RecentContainer />
            </div>
        </div>
    )
}

export default Home
