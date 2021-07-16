import React, { useEffect } from "react";
import { useContext } from "react";
import { useDropzone } from "react-dropzone";
import { GlobalContext } from "../store/GlobalState";
import DragDropIcon from "./../assets/icons/drag.svg";
// import article from "./../assets/articles/Article.xml"
// const XMLParser = require('react-xml-parser');
// const axios = require('axios');

import { uuid } from 'uuidv4';
function DropZoneFile(props) {

  const { addAsset } = useContext(GlobalContext);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone();

  

  useEffect(() => {

    acceptedFiles.map(file => {
      if (file.type === 'image/jpeg') {
        file.text().then(data => {
          console.log(data)
          let asset = {
            id: uuid(),
            date: new Date().toLocaleString(),
            extension: 'JPEG',
            size: `${file.size}KB`,
            blob: data,
            name: file.name
          }
          addAsset(asset)
        })
      }

      if (file.type === 'application/json') {
        file.text().then(article => {
          let file = JSON.parse(article);
            if (file && file.extension === 'MEPSA') {
              addAsset(file)
            }
        })
      }
    });
  }, [acceptedFiles])

  return (
    <div className="flex justify-center content-center">
      <div
        {...getRootProps({
          onDrop: event => {
            console.log(acceptedFiles)
            
          },
          className: `${
            isDragActive
              ? "bg-pink-700 border-pink-200"
              : "bg-gray-900 border-gray-100"
          } bg-gray-100 p-3 flex-grow rounded-lg flex justify-center border-dotted border-4 focus:outline-none focus:border-4 focus:border-pink-700 flex-col bg-opacity-5`,
        })}
      >
        <input  {...getInputProps({className: "min-w-full" })} />
        <div className="flex justify-center flex-wrap self-center">
            <img src={DragDropIcon} width="32" className="my-4 opacity-50" alt="" />
        </div>
        <div className="mx-auto flex justify-center flex-wrap self-center">
          <p
            className={`${
              isDragActive ? "text-indigo-300" : "text-gray-300"
            } self-center text-gray-300  text-center`}
          >
            Drag and drop file here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DropZoneFile;
