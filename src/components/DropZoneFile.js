import React from 'react'
import {useDropzone} from 'react-dropzone';



function DropZoneFile(props) {

    const getColor = (props) => {
        if (props.isDragAccept) {
            return '#00e676';
        }
        if (props.isDragReject) {
            return '#ff1744';
        }
        if (props.isDragActive) {
            return '#2196f3';
        }
        return '#eeeeee';
      }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
      } = useDropzone({accept: '.json'});


    return (
        <div className="flex justify-center content-center h-1/3">
            <div {...getRootProps({className: `${isDragActive ? 'bg-pink-100 border-pink-200' : 'bg-gray-100 border-gray-200'} bg-gray-100 p-3 flex-grow rounded-lg flex content-center border-dotted border-4 border-gray-200 focus:outline-none focus:border-4 focus:border-pink-700`})}>
            <input {...getInputProps({ className: "min-w-full"})} />
            <p className={`${isDragActive ? 'text-pink-300' : 'text-gray-300'} self-center text-gray-300 mx-auto text-center`}>Drag and drop 
file here, <br /> or click to upload.</p>
            </div>
        </div>
    )
}

export default DropZoneFile
