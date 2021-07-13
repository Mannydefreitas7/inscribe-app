import React from 'react'
import ArticleToolbar from '../components/topbar/ArticleToolbar'
import { ReactSVG } from "react-svg";
import './ArticleEditor.css';
import ContentEditable from "react-contenteditable";
function ArticleEditor() {
 
    
    return (
        <div className="editor">
            <div className="flex fixed w-full border-b-2 px-4 flex-row justify-between py-2" style={{backgroundColor: '#F8F8F8' }}>
            <button className="p-2  rounded bg-gray-900 bg-opacity-0 hover:bg-opacity-5">
                <ReactSVG
                    beforeInjection={(svg) => {
                    svg.setAttribute("style", "width: 24px; height: 24px;");
                    }}
                    src="/images/sidebar-left.svg"
                />
            </button>
                <ArticleToolbar />
            <div>
            <button className="p-2 mr-2 rounded bg-gray-900 bg-opacity-0 hover:bg-opacity-5">
                <ReactSVG
                    beforeInjection={(svg) => {
                    svg.setAttribute("style", "width: 24px; height: 24px;");
                    }}
                    src="/images/add.svg"
                />
            </button>
            <button className="p-2 mr-2 rounded bg-gray-900 bg-opacity-0 hover:bg-opacity-5">
                <ReactSVG
                    beforeInjection={(svg) => {
                    svg.setAttribute("style", "width: 24px; height: 24px;");
                    }}
                    src="/images/sidebar-right.svg"
                />
            </button>
            </div>
            </div>
    <div className="bg-white h-screen">
        <div className="container px-4 mx-auto" style={{ paddingTop: "100px" }} onClick={(e) => console.log(e)}>
        <ContentEditable
          tagName="div"
          draggable={true}
          onDrop={(e) => console.log(e)}
          onDrag={(e) => console.log(e)}
          html={`<h1>HELLO WORLD</h1>`} // innerHTML of the editable div
          disabled={false} // use true to disable edition
          onChange={(e) => console.log(e)} // handle innerHTML change
          onBlur={() => {}}
        />
        </div>
            </div>
        </div>
    )
}
export default ArticleEditor
