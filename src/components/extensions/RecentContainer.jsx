import React from 'react'
import RecentFile from './RecentFile'
import GridIcon from './../assets/icons/grid.svg'
import ListIcon from './../assets/icons/list.svg'
import { Link } from 'react-router-dom'

function RecentContainer() {


    return (
        <div className="mt-4">
        <div className="flex py-3 justify-between w-full border-t-2 border-gray-100">
            <h4 className="font-bold text-gray-500">Recent</h4>
            <div className="flex">
                <div className="appearance-none p-2 focus:outline">
                    <img src={ListIcon} width="24" className="mr-2" alt="" />
                </div>
                <div className="appearance-none p-2" href="">
                    <img src={GridIcon} width="24" className="mr-2" alt="" />
                </div>
            </div>
        </div>
        <Link to="/editor/article">
            <RecentFile name="G21_01_WISDOM_FOR_FAMILY_HAPPINESS.MEPSA" type="MEPS Article" date="December, 12th 2020 - 12:48pm" />
        </Link>
        <RecentFile name="G21_07_KNOWLEDGE_THAT_DRAWS_US_TO_GOD.MEPSA" type="MEPS Article" date="Yesterday - 08:46am"/>
        </div>
    )
}

export default RecentContainer
