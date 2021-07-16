import React, { useState } from 'react'
import ContentEditable from 'react-contenteditable'
import PlusIcon from './../assets/icons/plus.svg';
import MoreIcon from './../assets/icons/three-dots-vertical.svg';
import { ReactSVG } from 'react-svg';

export default function BlockEditor(props) {

    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className={`border-indigo-500 rounded-sm relative w-11/12 ${isFocused ? 'border-2' : 'border-0'}`} onBlur={() => setIsFocused(false)} onFocus={(e) => setIsFocused(true)}>

                {
                    props.block.type === 'text' ?
                    <ContentEditable
                        tagName="div"
                        draggable={false}
                        html={props.block.data} 
                        disabled={false} 
                        onChange={(e) => console.log(e)} 
                        onBlur={() => {}}
                        /> : props.block.data
                }

            {
                isFocused ? 
                <button className="absolute -right-3 top-1/2 p-1 transform -translate-y-1/2 bg-indigo-600 rounded-full">
                <ReactSVG src={PlusIcon} 
                beforeInjection={(svg) => {
                    svg.setAttribute('style', 'stroke: white; width: 18px; height: 18px;')
                  }}
                />
            </button> : null
            }

        </div>
    )
}
