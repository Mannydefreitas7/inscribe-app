import React from 'react'
import { useHistory } from 'react-router-dom'
import FileTemplate from '../FileTemplate'
import fileTemplates from '../../assets/json/fileTemplates.json'
import localforage from 'localforage';

function TemplatesBar() {

    const history = useHistory();
    const resetAll = async (path) => {
        try {
           await localforage.clear()
           history.push(path)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="p-4 border-r border-gray-100 h-almost pt-10" style={{ width : 400 }}>
            <h2 className="font-bold text-xl mb-1">Templates</h2>
            <input className="px-2 w-full rounded py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-800" type="text" placeholder="Search Templates" />
            <div className="grid grid-cols-3 gap-2 mt-4">
            {
            fileTemplates && fileTemplates.map((template, index) => <FileTemplate 
                key={index} 
                onClick={() => resetAll(template.path)}
                name={template.name} 
                image={template.image} />)
            }
            </div>
        </div>
    )
}

export default TemplatesBar
