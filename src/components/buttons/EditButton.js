import React from 'react'
import { ReactSVG } from "react-svg";

function EditButton(props) {
    return (
        <button
            className="p-2 ql-bold mx-2 rounded bg-gray-900 bg-opacity-0 hover:bg-opacity-5"
          key={props.cmd}
          onMouseDown={evt => {
            evt.preventDefault();
            document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
          }}
        >
          <ReactSVG
                beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 20px; height: 20px;");
                }}
                src={`/images/${props.icon}.svg`}
            />
        </button>
      );
}

export default EditButton
