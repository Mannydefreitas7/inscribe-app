import React, { useEffect } from "react";
import { useContext } from "react";
import { useDropzone } from "react-dropzone";
import { GlobalContext } from "../store/GlobalState";
import DragDropIcon from "./../assets/icons/drag.svg";

import { v4 } from 'uuid';
 import { useHistory, useLocation } from "react-router-dom";
import SecondaryButton from "./buttons/SecondaryButton";
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
            caption: null,
            type: 'image',
            size: `${file.size}KB`,
            text: file.name,
            name: file.name,
            raw: reader.result,
            blob: reader.result,
            crop: null,
            properties: {
              width: ''
            },
            crops: [
              {
                blob: null,
                id: v4(),
                name: 'SQR',
                aspect: 1 / 1,
                height: 224,
                unit: "px",
                x: 0,
                y: 0
              },
              {
                blob: null,
                id: v4(),
                name: 'PNR',
                aspect: 3 / 1,
                height: 250,
                unit: "px",
                x: 0,
                y: 0
              },
              {
                id: v4(),
                blob: null,
                name: 'LSR',
                aspect: 2 / 1,
                height: 400,
                unit: "px",
                x: 0,
                y: 0
              },
            ]
          }
          addAsset(asset)
        }
      }

        file.text().then(article => {
         console.log(article)
          let file = JSON.parse(article);
            if (file && file.extension === 'MEPSA') {
              
              if (location.pathname === '/home') {
                history.push('/article')
                setTimeout(() => {
                  addAsset(file)
                  toggleLeftSidebar(true)
                }, 1000)

              } else {
                addAsset(file)
              }
            }
        })

      return null
    });
    // eslint-disable-next-line
  }, [acceptedFiles])

  return (
    <div className="flex justify-center content-center mb-4 w-full" {...props}>
      <div
        {...getRootProps({
          onDrop: event => {
            console.log(acceptedFiles)
          },
          className: `${
            isDragActive
              ? "bg-indigo-700 border-indigo-200"
              : "bg-gray-900 border-gray-100"
          } bg-gray-100 p-3 flex-grow rounded flex justify-center border-dashed border-2 focus:outline-none focus:border-4 focus:border-indigo-700 flex-col bg-opacity-5`,
        })}
      >
        <input  {...getInputProps({className: "min-w-full" })} />
        <div className="flex justify-center flex-wrap self-center">
            <img src={DragDropIcon} width="32" className="my-4 opacity-30" alt="" />
        </div>
        <div className="mx-auto flex justify-center flex-wrap self-center">
          <div
            className={`${
              isDragActive ? "text-indigo-300" : "text-gray-300"
            } self-center text-gray-300  text-center`}
          >
            <span className="mb-2 block">Drag and drop file here.</span>
            <SecondaryButton label="Upload" />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default DropZoneFile;
