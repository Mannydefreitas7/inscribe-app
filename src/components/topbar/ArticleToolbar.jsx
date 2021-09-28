import React from 'react'
import { ReactSVG } from "react-svg";
import EditButton from '../buttons/EditButton';
import BoldIcon from './../../assets/icons/bold.svg';
import ItalicIcon from './../../assets/icons/italic.svg';
import UnderlineIcon from './../../assets/icons/underline.svg';
import LinkIcon from './../../assets/icons/link.svg';
import ParagraphIcon from './../../assets/icons/paragraph.svg';
import ListUnOrderedIcon from './../../assets/icons/list.svg';
import ListOrderedIcon from './../../assets/icons/list-ordered.svg';

function ArticleToolbar() {
    return (
        <div id="toolbar" className="flex px-2 items-center flex-row">
            <EditButton cmd="bold" icon={BoldIcon} />
            <EditButton cmd="italic" icon={ItalicIcon} />
            <EditButton cmd="underline" icon={UnderlineIcon} />
            <EditButton cmd="list" icon={ListUnOrderedIcon} />
            <EditButton cmd="list" icon={ListOrderedIcon} />
            
            <button 
            onMouseDown={evt => {
                evt.preventDefault();
                if (window.getSelection().anchorNode && window.getSelection().anchorNode.parentElement.localName === "a") {
                    document.execCommand("unlink", true, "") 
                } else {
                    document.execCommand("createLink", false, "https://github.com/lovasoa/react-contenteditable");
                }
            }}
            className="p-2 ql-bold flex items-center rounded hasDropdown bg-gray-900 bg-opacity-0 hover:bg-opacity-5">
                <ReactSVG
                    src={LinkIcon}
                />
            </button>

            <button 
            onMouseDown={evt => {
                evt.preventDefault();
                document.execCommand("styleWithCSS", false, false) 
            }}
            className="p-2 flex items-center rounded bg-gray-900 hasDropdown bg-opacity-0 hover:bg-opacity-5">
                <ReactSVG
                    src={ParagraphIcon}
                />
            </button>
        </div>
    )
}

export default ArticleToolbar
