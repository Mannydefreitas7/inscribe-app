import React from 'react'
import { ReactSVG } from "react-svg";
import EditButton from '../buttons/EditButton';

function ArticleToolbar() {
    return (
        <div id="toolbar" className="flex px-2 flex-row">
            <EditButton cmd="bold" icon="bold" />
            <EditButton cmd="italic" icon="italic" />
            <EditButton cmd="underline" icon="underline" />
            
            <button 
            onMouseDown={evt => {
                evt.preventDefault();
                if (window.getSelection().anchorNode.parentElement.localName == "a") {
                    console.log("it's a link bro")
                    document.execCommand("unlink", false, "") 
                } else {
                    document.execCommand("createLink", false, "https://github.com/lovasoa/react-contenteditable");
                }
            }}
            className="p-2 mx-2 rounded bg-gray-900 bg-opacity-0 hover:bg-opacity-5">
                <ReactSVG
                    beforeInjection={(svg) => {
                        svg.setAttribute("style", "width: 20px; height: 20px;");
                    }}
                    src="/images/link.svg"
                />
            </button>

            <button className="p-2 mx-2 rounded bg-gray-900 bg-opacity-0 hover:bg-opacity-5">
                <ReactSVG
                    beforeInjection={(svg) => {
                        svg.setAttribute("style", "width: 20px; height: 20px;");
                    }}
                    src="/images/letter-a.svg"
                />
            </button>
        </div>
    )
}

export default ArticleToolbar
