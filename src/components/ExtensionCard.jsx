import React from "react";
import { ReactSVG } from "react-svg";
import DownloadIcon from "../assets/icons/DownloadIcon";
import TrashIcon from "../assets/icons/TrashIcon";
import UpdateIcon from "../assets/icons/UpdateIcon";

function ExtensionCard(props) {


  return (
    <div key={props.id} className="flex flex-row p-4 justify-between content-center rounded-lg bg-gray-900 bg-opacity-5 hover:bg-opacity-10">
      <div className="flex content-center w-9/12">
        <div className="self-center mr-4">
          <ReactSVG
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 40px");
            }}
            src={`images/${props.icon}.svg`}
          />
        </div>
        <p className="text-lg self-center font-semibold text-gray-600 leading-5">
          {props.name} <br />
          <span className="text-sm font-normal text-gray-400">
            {props.description}
          </span>
        </p>
      </div>
      <div className="flex flex-wrap flex-col justify-center content-center">
        <div className="self-center">
          {props.isInstalled ? (
            props.hasUpdate ? (
              <UpdateIcon />
            ) : (
              <TrashIcon />
            )
          ) : (
            <DownloadIcon />
          )}
        </div>
        <span className="text-gray-600 mt-2 text-sm">
          {props.isInstalled
            ? props.hasUpdate
              ? "Update"
              : "Remove"
            : props.size}
        </span>
      </div>
    </div>
  );
}

export default ExtensionCard;
