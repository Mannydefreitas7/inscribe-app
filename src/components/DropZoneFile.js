import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import DragDropIcon from "./../assets/icons/drag.svg";
// import article from "./../assets/articles/Article.xml"
// const XMLParser = require('react-xml-parser');
// const axios = require('axios');
function DropZoneFile(props) {


  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: ".mepsa" });

  

  useEffect(() => {

  //   axios.get(article, {
  //     "Content-Type": "application/xml; charset=utf-8"
  //  })
  //  .then((response) => {
  //     console.log('Your xml file as string', response.data);
  //  });

    acceptedFiles.map(file => {
      file.text().then(article => {
        console.log(article)
      })
    });
  })

  return (
    <div className="flex justify-center content-center" style={{ height : '300px'}}>
      
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
            Drag and drop {props.name}, <br /> or click to upload.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DropZoneFile;
