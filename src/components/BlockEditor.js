import React, { useState } from 'react'
import ContentEditable from 'react-contenteditable'
import PlusIcon from './../assets/icons/plus.svg';
import { ReactSVG } from 'react-svg';

export default function BlockEditor(props) {

    const [isFocused, setIsFocused] = useState(false);

    const blockType = () => {
        switch (props.block.type) {
            case 'text':
                return <ContentEditable
                    tagName="div"
                    className={props.block.classlist.toString().replace(',', ' ')}
                    draggable={false}
                    html={props.block.data} 
                    disabled={false} 
                    onChange={(e) => console.log(e)} 
                    onBlur={() => {}}
                />
            case 'image':
                return <img contentEditable={true} className={props.block.classlist.toString().replace(',', ' ')} alt={props.block.name} src={props.block.blob} />
            case 'container':
                return <div className={props.block.classlist.toString().replace(',', ' ')}>{
                props.block.children.map(item => {
                    if (item.type === 'text') {
                        return <ContentEditable
                        tagName="span"
                        className={item.classlist.toString().replace(',', ' ')}
                        draggable={false}
                        html={item.data} 
                        disabled={false} 
                        onChange={(e) => console.log(e)} 
                        onBlur={() => {}}
                    />
                    }
                    if (item.type === 'link') {
                        return <a className={item.classlist.toString().replace(',', ' ')}>{item.data}</a>
                    }
                })
                }
                </div>
            default:
                break;
        }
    }

    return (
        <div className="cursor-default" onBlur={() => setIsFocused(false)} onFocus={(e) => setIsFocused(true)}>
        {
                props.block.classlist.length > 0 && isFocused ? 
                <div className="py-1 px-2 bg-indigo-600 cursor-move rounded-sm inline-flex">
                    {
                        props.block.classlist.map(c => {
                            return <span className="text-white text-xs">.{c}</span>
                        })
                    }
                
                </div> : null
            }
        <div className={`border-indigo-500 bg-white rounded-sm relative w-full ${isFocused ? 'border-2' : 'border-0'} ${props.snapshot.isDragging ? 'shadow-lg' : ''}`}>

                { blockType() }

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
        </div>
    )
}
