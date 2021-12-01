import React from 'react'

import BrochureIcon from './../assets/icons/brochure.svg';
import ArticleIcon from './../assets/icons/article.svg';
import { Link } from 'react-router-dom';

function CreateFileTemplate() {
    return (
        <>
        <div className="flex py-3 justify-between w-full border-b-2 border-gray-100">
            <h4 className="text-gray-500">Let's Start</h4>
        </div>
        <div className="flex py-6">
            <Link to="/presentation" className="flex items-center hover:bg-black hover:bg-opacity-5 justify-center py-8 flex-col w-1/2  rounded mr-3" style={{ height: 180 }}>
                <img src={BrochureIcon} alt="Presentation" style={{ height: 100, opacity: .5 }} />
                <p className="mt-3 text-center">
                    <span className="font-bold text-gray-500">Layout Design</span> <br />
                    <span className="text-gray-400">Digital content and presentation tools.</span>
                </p>
            </Link>
            <div className="flex items-center hover:bg-black hover:bg-opacity-5 justify-center py-8 flex-col w-1/2  rounded mr-3" style={{ height: 180 }}>
                <img src={ArticleIcon} alt="Presentation" style={{ height: 100, opacity: .5 }} />
                <p className="mt-3 text-center">
                    <span className="font-bold text-gray-500">Writing</span> <br />
                    <span className="text-gray-400">Includes article writing and editing tools.</span>
                </p>
            </div>
            
          
        </div>
        </>
    )
}

export default CreateFileTemplate
