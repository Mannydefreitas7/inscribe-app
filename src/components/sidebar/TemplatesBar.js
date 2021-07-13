import React, { useEffect } from 'react'
import FileTemplate from '../FileTemplate'
import fileTemplates from './../../assets/json/fileTemplates.json'

function TemplatesBar() {

      useEffect(() => {
      //  getTemplates()
      console.log(fileTemplates)
      },[])


    return (
        <div className="p-4 border-r h-almost pt-10" style={{width : "400px"}}>
            <h2 className="font-bold text-xl mb-1">Templates</h2>
            <input className="px-2 w-full rounded py-2 border border-gray-300 appearance-none focus:outline-none focus:border-pink-800" type="text" placeholder="Search Templates" />
            <div className="grid grid-cols-2 gap-4 mt-4">
            {
            fileTemplates && fileTemplates.map(template => <FileTemplate key={template.id} name={template.name} image={template.image} />)
            }
            </div>
        </div>
    )
}

export default TemplatesBar
