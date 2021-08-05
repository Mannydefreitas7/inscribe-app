import React, { useContext } from 'react'
// import ContentEditable from 'react-contenteditable'
import PlusIcon from './../assets/icons/plus-white.svg';
import CloseIcon from './../assets/icons/close-white.svg';
import { ReactSVG } from 'react-svg';
import CropIcon from './../assets/icons/crop.svg';
import TrashIcon from './../assets/icons/trash-white.svg';
import { GlobalContext } from '../store/GlobalState';
import ImageCropper from './ImageCropper';
import AddView from './AddView';
import { useDrag } from 'react-dnd'

export default function BlockEditor(props) {

    const { selectItem, selectedItem, openModal, removeItem, removeClass, presentation } = useContext(GlobalContext);


    const blockType = () => {
        switch (props.block.type) {
            case 'text':
                return <div id={props.block.id} className={props.block.classlist && props.block.classlist.toString().replace(',', ' ')}>{props.block.text}</div>
                // <ContentEditable
                //     tagName="div"
                //     id={props.block.id}
                //     className={props.block.classlist.toString().replace(',', ' ')}
                //     html={props.block.data}
                //     disabled={selectedItem && !selectedItem.id === props.block.id}

                // />
            case 'image':
                return <img contentEditable={true} className={props.block.classlist && props.block.classlist.toString().replace(',', ' ')} alt={props.block.name} src={props.block.blob} />
            case 'container':
                return <div  id={props.block.id} className={ props.block.classlist && props.block.classlist.toString().replace(',', ' ')}>{
                    props.block && props.block.children && props.block.children.map((item, i) => {
                        if (item.type === 'text') {
                            // return <ContentEditable
                            //     tagName="span"
                            //     key={i}
                            //     id={item.id}
                            //     className={item.classlist.toString().replace(',', ' ')}
                            //     html={item.data}
                            //     disabled={selectedItem && !selectedItem.id === props.block.id}
                            // />
                            return <span key={i} className={item.classlist.toString().replace(',', ' ')}>{item.text}</span>
                        }
                        if (item.type === 'link') {
                            return <a key={i} href={window.location.URL} id={props.block.id} className={item.classlist.toString().replace(',', ' ')}>{item.text}</a>
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
        <div id={props.block.id} >
            <div onClick={(e) => { selectItem(props.block) }}>
                {
                    selectedItem && selectedItem.id === props.block.id ?
                        <div className="flex mt-2">
                            
                            {
                                props.block && props.block.classlist && props.block.classlist.length > 0 && props.block.classlist.map((c, i) => {
                                    return <button key={i} className="text-white text-xs py-1 px-2 mr-1 bg-indigo-600 rounded-sm mb-0 inline-flex items-center">.{c}<span className="ml-2"><img style={{ width: 10 }} src={CloseIcon} alt="remove class" onClick={() => removeClass(props.block, c)} /></span></button>
                                })
                            }
                        </div> : null
                }


                <div className={`border-indigo-300 bg-white border-dashed rounded-sm relative w-full ${selectedItem && selectedItem.id === props.block.id ? 'border mb-3' : 'border-0 mb-0 p-0'} `}>{blockType()}
                
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

                                <button className={`p-2 bg-indigo-600 hover:bg-indigo-700 rounded cursor-pointer ${props.block.type === 'image' ? 'mt-1' : ''}`} onClick={() => removeItem(props.block, presentation)}>
                                    <ReactSVG src={TrashIcon} />
                                </button>
                                

                            </div> : null
                    }
                </div>
            </div>
        </div>

    )
}
