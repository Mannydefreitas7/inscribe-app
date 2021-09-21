import React, { useContext, useRef } from 'react'
import CloseIcon from './../assets/icons/close-white.svg';
import { ReactSVG } from 'react-svg';
import CropIcon from './../assets/icons/crop.svg';
import TrashIcon from './../assets/icons/trash.svg';
import { GlobalContext } from '../store/GlobalState';
import ImageCropper from './modal/ImageCropper';
import { useDrag, useDrop } from 'react-dnd';
import ContentEditable from 'react-contenteditable';
import { v4 } from 'uuid'
import DropZoneImage from './DropZoneImage';
import InsContextMenu from './modal/ContextMenu';


export default function BlockEditor(props) {

    const { selectItem, selectedItem, openModal, removeItem, removeClass, presentation, loadPresentation } = useContext(GlobalContext);

    const bloc = useRef();

    const [collected, dragRef] = useDrag(() => ({
        type: 'BLOCK',
        item: props.block,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    const buttons = [
        {
            label: 'Delete',
            icon: TrashIcon,
            action: (event, data) => {
                removeItem(data, presentation)
            }
        }
    ]

    const imageButtons = [
        {
            label: 'Crop',
            icon: CropIcon,
            action: (event, data) => {
                openModal(<ImageCropper selectedItem={data} />, 0, "0%")
            }
        },
        {
            label: 'Delete',
            icon: TrashIcon,
            action: (event, data) => {
                removeItem(data, presentation)
            }
        }
    ]

    const [dropTextBoxCollected, dropTextBoxRef] = useDrop(() => ({
       
        accept: ['ASSET'],
        drop: (item, monitor) => {
            handleDrop(item)
        },
        collect: (monitor) => ({

          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        })
      }))
      const handleDrop = (item) => {
        let index = presentation.items.findIndex(el => el.id === props.block.id)
        item.id = v4()
        presentation.items[index] = item
        loadPresentation(presentation)
}




    const blockType = () => {
        switch (props.block.type) {
            case 'textbox': 
                return <div 
                        ref={dropTextBoxRef}
                        className={` ${props.block.text ? 'bg-opacity-0' : 'p-2 border-2 bg-opacity-10' }   border-dashed ${dropTextBoxCollected.isOver ? 'bg-indigo-100 border-indigo-200' : 'bg-gray-100 border-gray-100'}`}
                        style={{ height: dropTextBoxCollected.isOver ? 200 : 'auto', minHeight: props.block.text ? 'auto' : 100  }}
                       
                        >
                        <div ref={dragRef} className={props.block.classlist.toString().replace(',', ' ')}>
                            <ContentEditable
                                tagName="div"
                                className={props.block.text ? '' : 'text-gray-300'}
                                id={props.block.id}
                                onChange={(e) => {
                                    props.block.text = e.target.value;
                                    //loadPresentation(presentation)
                                }}
                                onBlur={(e) => loadPresentation(presentation)}
                                html={props.block.text ? props.block.text : 'Drop or enter text here...'}
                            />
                        </div>
                    </div>
            case 'text':
                let textId = v4();
                return   <InsContextMenu id={textId} buttons={buttons} data={props.block}><div id={props.block.id} className={props.block.classlist && props.block.classlist.join(' ')}  ref={dragRef} >{props.block.text}</div></InsContextMenu>

            case 'image':
                let imageId = v4();
                return <InsContextMenu id={imageId} buttons={imageButtons} data={props.block}><div className="my-2">
                            <img className={props.block.classlist && props.block.classlist.join(' ')} alt={props.block.name} src={props.block.blob} ref={dragRef} />
                            <p className="mt-2 text-gray-500">{props.block.caption}</p>
                        </div></InsContextMenu>
                    
            case 'imageBox':
                
            return <div
                        
                        className={`bg-opacity-0`}
                        >
                            {
                                props.block.blob ?  <img className={props.block.classlist && props.block.classlist.join(' ')} alt={props.block.name} src={props.block.blob} /> : 
                                <DropZoneImage block={props.block} />
                            }
                            

                        </div>
            case 'container':
                let containerId = v4();
                return <InsContextMenu id={containerId} buttons={buttons} data={props.block}><div className={ props.block.classlist && props.block.classlist.join(' ')}  ref={dragRef} >{
                    props.block && props.block.items && props.block.items.map((item, i) => {
                        if (item.type === 'text') {

                            return <span key={i} className={item.classlist.join(' ')}>{item.text}</span>
                        }
                        if (item.type === 'link') {
                            return <a key={i} href={window.location.URL} id={props.block.id} className={item.classlist.join(' ')}>{item.text}</a>
                        }
                        return null
                    })
                }
                </div></InsContextMenu>

            default:
                break;
        }
    }

    return (

        <div 
        ref={bloc}
        id={props.block && props.block.id} >
            <div onClick={(e) => { selectItem(props.block) }}>
                {
                    !collected.isDragging && selectedItem && selectedItem.id === props.block.id ?
                        <div className="flex mt-2">
                            
                            {
                                props.block && props.block.classlist && props.block.classlist.length > 0 && props.block.classlist.map((c, i) => {
                                    return <button key={i} className="text-white text-xs font-medium py-1 px-2 mr-1 bg-indigo-600 rounded-sm mb-0 inline-flex items-center">.{c}<span className="ml-2"><img style={{ width: 10 }} src={CloseIcon} alt="remove class" onClick={() => removeClass(props.block, c, presentation)} /></span></button>
                                })
                            }
                        </div> : null
                }

 
                <div 
                className={`relative w-full ${!collected.isDragging && selectedItem && selectedItem.id === props.block.id ? 'border-2 mb-3 border-dashed border-indigo-300' : 'border-0 mb-0 p-0'} hover:bg-gray-500 hover:bg-opacity-5 `} >
                  
                        { blockType() }
                    
                
                    {
                       !collected.isDragging && selectedItem && selectedItem.id === props.block.id ?
                            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2  rounded inline-flex flex-col items-center justify-center z-20 bg-white  shadow">
                                {
                                    props.block.type === 'image' ?
                                        <button
                                            onClick={(e) => {
                                                openModal(<ImageCropper selectedItem={props.block} />, 0, "0%")
                                            }}
                                            className="p-2 hover:bg-gray-50 rounded">
                                            <ReactSVG src={CropIcon}
                                                beforeInjection={(svg) => {
                                                    svg.setAttribute('style', 'width: 16px; height: 16px;')
                                                }}
                                            />
                                        </button> :
                                        null
                                }
                            
                            <button className={`p-2 hover:bg-gray-50 rounded cursor-pointer`} onClick={() => removeItem(props.block, presentation)}>
                                <ReactSVG src={TrashIcon} />
                            </button>
                            </div> : null
                    }
                    
                </div>
                {/* </Resizable> */}
            </div>
                
        </div>

    )
}
