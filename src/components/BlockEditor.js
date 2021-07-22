import React, { useContext } from 'react'
import ContentEditable from 'react-contenteditable'
import PlusIcon from './../assets/icons/plus-white.svg';
import CloseIcon from './../assets/icons/close-white.svg';
import { ReactSVG } from 'react-svg';
import CropIcon from './../assets/icons/crop.svg';
import TrashIcon from './../assets/icons/trash-white.svg';
import DragIcon from './../assets/icons/drag-white.svg';
import { GlobalContext } from '../store/GlobalState';
import ImageCropper from './ImageCropper';
import AddView from './AddView';

export default function BlockEditor(props) {

    const { selectItem, selectedItem, openModal, removeItem, removeClass } = useContext(GlobalContext);
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
                 selectedItem && selectedItem.id === props.block.id ?
                    <div className="flex mt-2">
                        {/* <img className="bg-indigo-600 rounded-sm py-1 px-2 cursor-move" src={DragIcon} alt="drag handle"/> */}
                        {
                            props.block.classlist.length > 0 && props.block.classlist.map((c, i) => {
                                return <button key={i} className="text-white text-xs py-1 px-2 mr-1 bg-indigo-600 rounded-sm mb-0 inline-flex items-center">.{c}<span className="ml-2"><img style={{ width: 10 }} src={CloseIcon} alt="remove class" onClick={() => removeClass(props.block, c)} /></span></button>
                            })
                        }

                    </div> : null
            }
            <div className={`border-indigo-500 bg-white border-dashed rounded-sm relative w-full ${selectedItem && selectedItem.id === props.block.id ? 'border-2 mb-3' : 'border-0 mb-0'} ${props.snapshot.isDragging ? 'shadow-lg' : ''}`}>

                {blockType()}

                {
                    selectedItem && selectedItem.id === props.block.id ?
                    <div className="absolute -bottom-4 left-1/2 p-1 transform -translate-x-1/2 bg-indigo-600 rounded inline-flex items-center justify-center z-20">
                        <button className="p-1 hover:bg-indigo-700 rounded" onClick={() => openModal(<AddView />)}>
                            <ReactSVG src={PlusIcon} />
                        </button>     
                    </div> : null
                }

                {
                    selectedItem && selectedItem.id === props.block.id ?
                    <div className="absolute -right-4 top-1/2 p-1 transform -translate-y-1/2  rounded inline-flex flex-col items-center justify-center z-20">
                        {
                            props.block.type === 'image' ?  
                            <button 
                            onClick={() => {
                                openModal(<ImageCropper />)
                            }}
                            className="p-2 bg-indigo-600 hover:bg-indigo-800 rounded">
                                <ReactSVG src={CropIcon}
                                    beforeInjection={(svg) => {
                                        svg.setAttribute('style', 'stroke: white; width: 18px; height: 18px;')
                                    }}
                                />
                            </button> : 
                            null
                        }
                        <button className={`p-2 bg-indigo-600 hover:bg-indigo-700 rounded ${props.block.type === 'image' ? 'mt-1' : ''}`} onClick={() => removeItem(props.block)}>
                            <ReactSVG src={TrashIcon} />
                        </button>
                        
                    </div> : null
                }

            </div>
        </div>
    )
}
