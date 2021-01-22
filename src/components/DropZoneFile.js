import React from "react";
import { useDropzone } from "react-dropzone";
import DragDropIcon from "./../assets/icons/DragDropIcon";

function DropZoneFile(props) {
  const getColor = (props) => {
    if (props.isDragAccept) {
      return "#00e676";
    }
    if (props.isDragReject) {
      return "#ff1744";
    }
    if (props.isDragActive) {
      return "#2196f3";
    }
    return "#eeeeee";
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: ".json" });

  return (
    <div className="flex justify-center content-center" style={{ height : '300px'}}>
      <div
        {...getRootProps({
          className: `${
            isDragActive
              ? "bg-pink-700 border-pink-200"
              : "bg-gray-900 border-gray-300"
          } bg-gray-100 p-3 flex-grow rounded-lg flex justify-center border-dotted border-4 focus:outline-none focus:border-4 focus:border-pink-700 flex-col bg-opacity-5`,
        })}
      >
        <input {...getInputProps({ className: "min-w-full" })} />
        <div className="flex justify-center flex-wrap self-center">
          <DragDropIcon fill={isDragActive ? "#F9A8D4" : "#9CA3AF"} />
        </div>
        <div className="mx-auto flex justify-center flex-wrap self-center">
          <p
            className={`${
              isDragActive ? "text-pink-300" : "text-gray-400"
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
