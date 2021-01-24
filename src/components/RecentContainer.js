import React from 'react'
import RecentFile from './RecentFile'
import GridIcon from './../assets/icons/GridIcon'
import ListIcon from './../assets/icons/ListIcon'
import { Link } from 'react-router-dom'

function RecentContainer() {


    return (
        <div className="mt-4">
        <div className="flex py-3 justify-between w-full border-t">
            <h4 className="font-bold">Recent</h4>
            <div className="flex">
                <a className="appearance-none p-2 focus:outline">
                    <ListIcon />
                </a>
                <a className="appearance-none p-2">
                    <GridIcon />
                </a>
            </div>
        </div>
        <Link to="/editor/article">
            <RecentFile name="1004_W18_040_TRUTH-1.MEPSA" date="December, 12th 2020 - 12:48pm" />
        </Link>
        <RecentFile name="1004_W18.MEPSP" date="Yesterday - 08:46am"/>
        </div>
    )
}

export default RecentContainer
