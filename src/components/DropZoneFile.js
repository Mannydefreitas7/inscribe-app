import React, { useEffect } from "react";
import { useContext } from "react";
import { useDropzone } from "react-dropzone";
import { GlobalContext } from "../store/GlobalState";
import DragDropIcon from "./../assets/icons/drag.svg";

import { v4 } from 'uuid';
import { useHistory, useLocation } from "react-router-dom";
function DropZoneFile(props) {

  const { addAsset, toggleLeftSidebar } = useContext(GlobalContext);
  const location = useLocation();
  const history = useHistory();
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
  } = useDropzone();

  

  useEffect(() => {

    acceptedFiles.map(file => {
    
      if (file.type === 'image/jpeg') {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          let asset = {
            id: v4(),
            date: new Date().toLocaleString(),
            extension: 'JPEG',
            classlist:[],
            description: 'image',
            type: 'image',
            size: `${file.size}KB`,
            data: file.name,
            name: file.name,
            raw: reader.result,
            blob: reader.result,
            crops: [
              {
                blob: null,
                id: v4(),
                name: 'SQR',
                height: 224,
                width: 224,
                unit: "px",
                x: 0,
                y: 0
              },
              {
                blob: null,
                id: v4(),
                name: 'PNR',
                height: 267,
                width: 801,
                unit: "px",
                x: 0,
                y: 0
              },
              {
                id: v4(),
                blob: null,
                name: 'LSR',
                height: 400,
                width: 800,
                unit: "px",
                x: 0,
                y: 0
              },
            ]
          }
          addAsset(asset)
         // console.log(reader.result)
        }
      }


      if (file.type === 'application/json') {
        file.text().then(article => {
          let file = JSON.parse(article);
            if (file && file.extension === 'MEPSA') {
              
              if (location.pathname === '/home') {
                history.push('/editor')
                setTimeout(() => {
                  addAsset(file)
                  toggleLeftSidebar(true)
                }, 1000)

              } else {
                addAsset(file)
              }
            }
        })
      }
      return null
    });
  }, [acceptedFiles])

  return (
    <div className="flex justify-center content-center mb-4" {...props}>
      <div
        {...getRootProps({
          onDrop: event => {
            console.log(acceptedFiles)
            
          },
          className: `${
            isDragActive
              ? "bg-indigo-700 border-indigo-200"
              : "bg-gray-900 border-gray-100"
          } bg-gray-100 p-3 flex-grow rounded-lg flex justify-center border-dotted border-4 focus:outline-none focus:border-4 focus:border-indigo-700 flex-col bg-opacity-5`,
        })}
      >
        <input  {...getInputProps({className: "min-w-full" })} />
        <div className="flex justify-center flex-wrap self-center">
            <img src={DragDropIcon} width="32" className="my-4 opacity-30" alt="" />
        </div>
        <div className="mx-auto flex justify-center flex-wrap self-center">
          <p
            className={`${
              isDragActive ? "text-indigo-300" : "text-gray-300"
            } self-center text-gray-300  text-center`}
          >
            Drag and drop file here. <br />
            <button className="px-2 py-1 text-gray-400 rounded border mt-2 border-gray-100 mr-1 text-sm hover:bg-gray-100">Upload</button>
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default DropZoneFile;
