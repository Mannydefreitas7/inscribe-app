import React, { useContext } from 'react'
import ContentEditable from 'react-contenteditable'
import PlusIcon from './../assets/icons/plus.svg';
import { ReactSVG } from 'react-svg';
import CropIcon from './../assets/icons/crop.svg';
import { GlobalContext } from '../store/GlobalState';
import ImageCropper from './ImageCropper';

export default function BlockEditor(props) {

    const { selectItem, selectedItem, openModal } = useContext(GlobalContext);
    const blockType = () => {
        switch (props.block.type) {
            case 'text':
                return <ContentEditable
                    tagName="div"
                    id={props.block.id}
                    className={props.block.classlist.toString().replace(',', ' ')}
                    draggable={false}
                    html={props.block.data}
                    disabled={false}
                    onChange={(e) => console.log(e)}
                    onBlur={() => { }}
                />
            case 'image':
                return <img contentEditable={true} className={props.block.classlist.toString().replace(',', ' ')} alt={props.block.name} src={props.block.blob} />
            case 'container':
                return <div id={props.block.id} className={props.block.classlist.toString().replace(',', ' ')}>{
                    props.block.children.map((item, i) => {
                        if (item.type === 'text') {
                            return <ContentEditable
                                tagName="span"
                                key={i}
                                id={item.id}
                                className={item.classlist.toString().replace(',', ' ')}
                                draggable={false}
                                html={item.data}
                                disabled={false}
                                onChange={(e) => console.log(e)}
                                onBlur={() => { }}
                            />
                        }
                        if (item.type === 'link') {
                            return <a href={window.location.URL} id={props.block.id} className={item.classlist.toString().replace(',', ' ')}>{item.data}</a>
                        }
                        return null
                    })
                }
                </div>
            default:
                break;
        }
    }

    return (
        <div className="cursor-default" 
        onFocus={(e) => {
            selectItem(props.block)
        }}>
            {
                props.block.classlist.length > 0 && selectedItem && selectedItem.id === props.block.id ?
                    <div className="py-1 px-2 bg-indigo-600 cursor-move rounded-sm inline-flex">
                        {
                            props.block.classlist.map((c, i) => {
                                return <span key={i} className="text-white text-xs">.{c}</span>
                            })
                        }

                    </div> : null
            }
            <div className={`border-indigo-500 bg-white rounded-sm relative w-full ${selectedItem && selectedItem.id === props.block.id ? 'border-2' : 'border-0'} ${props.snapshot.isDragging ? 'shadow-lg' : ''}`}>

                {blockType()}

                {
                    selectedItem && selectedItem.id === props.block.id ?
                    <div className="absolute -right-3 top-1/2 p-1 transform -translate-y-1/2 bg-indigo-600 rounded inline-flex items-center justify-center flex-col">
                        <button className="p-1 hover:bg-indigo-700 rounded">
                            <ReactSVG src={PlusIcon}
                                beforeInjection={(svg) => {
                                    svg.setAttribute('style', 'stroke: white; width: 18px; height: 18px;')
                                }}
                            />
                        </button>
                        {
                            props.block.type === 'image' ?  
                            <button 
                            onClick={() => {
                                openModal(<ImageCropper />)
                            }}
                            className="p-1 hover:bg-indigo-700 rounded">
                                <ReactSVG src={CropIcon}
                                    beforeInjection={(svg) => {
                                        svg.setAttribute('style', 'stroke: white; width: 18px; height: 18px;')
                                    }}
                                />
                            </button> : 
                            null
                        }
                        
                    </div> : null
                }

            </div>
        </div>
    )
}
