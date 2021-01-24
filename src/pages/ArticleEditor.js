import React from 'react'
import ArticleToolbar from '../components/topbar/ArticleToolbar'
import { ReactSVG } from "react-svg";
import ReactQuill, {Quill } from 'react-quill';
import './ArticleEditor.css';
import ContentEditable from "react-contenteditable";

function ArticleEditor() {

    ArticleEditor.modules = {
        toolbar: {
          container: "#toolbar",
        },
        clipboard: {
          
        }
      };

      ArticleEditor.formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color"
      ];

    return (
        <div>
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
            {/* <ReactQuill
            id="1"
            className="h-screen bg-white focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => {console.log(e)}}
            placeholder={""}
            
            onChangeSelection={(e) => console.log(e)}
            value={`<h1>HELLO WORLD</h1>`}
            modules={ArticleEditor.modules}
            formats={ArticleEditor.formats}
            theme={""}
        >
            <div className="h-screen px-4 container mx-auto" style={{ paddingTop: "100px" }}>

            </div>
        </ReactQuill> */}
    <div className="bg-white h-screen">


        <ContentEditable
       style={{ paddingTop: "100px" }}
          className="px-4 container mx-auto"
          tagName="div"
          html={`<h1>HELLO WORLD</h1>`} // innerHTML of the editable div
          disabled={false} // use true to disable edition
          onChange={(e) => console.log(e)} // handle innerHTML change
          onBlur={() => {}}
        />
            </div>
        </div>
    )
}
export default ArticleEditor
