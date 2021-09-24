import React, { useContext, useRef, useState } from 'react'
import CloseIcon from './../assets/icons/close-white.svg';
import CropIcon from './../assets/icons/crop.svg';
import AddIcon from './../assets/icons/plus.svg';
import TrashIcon from './../assets/icons/trash.svg';
import { GlobalContext } from '../store/GlobalState';
import ImageCropper from './modal/ImageCropper';
import { useDrag, useDrop } from 'react-dnd';
import ContentEditable from 'react-contenteditable';
import { v4 } from 'uuid'
import DropZoneImage from './DropZoneImage';
import InsContextMenu from './modal/ContextMenu';
import AddView from './modal/AddView';
import { Resizable } from 're-resizable';


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
            label: 'Add',
            icon: AddIcon,
            action: (event, data) => {
                openModal(<AddView />, event.clientX, event.clientY)
            }
        },
        {
            label: 'Delete',
            icon: TrashIcon,
            action: (event, data) => {
                removeItem(data, presentation)
            }
        },
        
    ]

    const imageButtons = [
        {
            label: 'Add',
            icon: AddIcon,
            action: (event, data) => {
                openModal(<AddView />, event.clientX, event.clientY)
            }
        },
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
        drop: (item, monitor) => { handleDrop(item) },
        collect: (monitor) => ({
          isOver: monitor.isOver()
        })
      }))

      const [width, setWidth] = useState();
      const handleDrop = (item) => {
        let index = presentation.items.findIndex(el => el.id === props.block.id)
        item.id = v4()
        presentation.items[index] = item
        loadPresentation(presentation)
    }

    const onResize = (event, direction, el, delta) => {
        let value = Number(el.style.width.replace('%', ''))
         if (value > 90) {
             setWidth('100%')
    
        } else if (value >= 80 && value < 90) {
            setWidth('86%')
         } else if (value >= 60 && value < 70) {
             setWidth('74%')
         } else if (value > 50 && value < 60) {
             setWidth('61%')
         } else if (value > 40 && value <= 50) {
             setWidth('49.5%')
         } else if (value > 30 && value < 40) {
             setWidth('36%')
         } else if (value > 20 && value < 30) {
             setWidth('24%')
         } else if (value < 20) {
             setWidth('12%')
         }
        props.block.properties.width = width
        loadPresentation(presentation)
     }


    const blockType = () => {
        switch (props.block.type) {
            case 'textbox': 
                return <div 
                        ref={dropTextBoxRef}
                        className={` ${props.block.text ? 'bg-opacity-0' : 'p-2 border-2 bg-opacity-10' }   border-dashed ${dropTextBoxCollected.isOver ? 'bg-indigo-100 border-indigo-200' : 'bg-gray-100 border-gray-100'}`}
                        style={{ height: dropTextBoxCollected.isOver ? 200 : 'auto', minHeight: props.block.text ? 'auto' : 100, transition: 'height ease-in-out .2s'  }}>
                        <div >
                            <ContentEditable
                                tagName="div"
                                className={props.block.text ? props.block.classlist.join(' ') : 'text-gray-300'}
                                id={props.block.id}
                                onChange={(e) => { 
                                    props.block.text = e.target.value 
                                }}
                                onBlur={(e) => {                                    
                                    let i = props.block.classlist.findIndex(el => el.includes('text-'))
                                    if (i < 0) {
                                        props.block.classlist.push('text-paragraph')
                                    }
                                    loadPresentation(presentation)
                                }}
                                html={props.block.text ? props.block.text : 'Drop or enter text here...'}
                            />
                        </div>
                    </div>
            case 'text':
                let textId = v4();
                return   <InsContextMenu ref={dragRef} id={textId} buttons={buttons} data={props.block}><div ref={dragRef} id={props.block.id} className={props.block.classlist && props.block.classlist.join(' ')} >{props.block.text}</div></InsContextMenu>

            case 'image':
                let imageId = v4();
                return <InsContextMenu id={imageId} buttons={imageButtons} data={props.block}><div className="my-2 clear-both z-50" ref={dragRef}>
                            <img className={props.block.classlist && props.block.classlist.join(' ')} alt={props.block.name} src={props.block.blob} />
                            <p className="mt-2 text-gray-500">{props.block.caption}</p>
                        </div></InsContextMenu>
                    
            case 'imageBox':   
            return <div className={`bg-opacity-0`}>
                {
                    props.block.blob ?  <img className={props.block.classlist && props.block.classlist.join(' ')} alt={props.block.name} src={props.block.blob} /> : 
                    <DropZoneImage block={props.block} />
                }
                </div>
            case 'container':
                let containerId = v4();
                return <InsContextMenu   id={containerId} buttons={buttons} data={props.block}><div ref={dragRef} className={ props.block.classlist && props.block.classlist.join(' ')}  >{
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
        id={props.block && props.block.id} className="relative">
            <div  onClick={(e) => { selectItem(props.block) }}>
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

                    <Resizable
                        bounds={'parent'}
                        onResize={onResize}
                        size={{
                            width: props.block.properties && props.block.properties.width ? props.block.properties.width : '100%',
                            height: 'auto'
                        }}
                        className={`relative ${!collected.isDragging && selectedItem && selectedItem.id === props.block.id ? 'border-2 mb-3 border-dashed border-indigo-300' : 'border-0 mb-0 p-0 '} `}
                        enable={{ right: selectedItem && props.block.id === selectedItem.id && selectedItem.type === 'image' }}
                        handleComponent={{ right: selectedItem && props.block.id === selectedItem.id && selectedItem.type === 'image' ? <div className="bg-white shadow-sm rounded-full border-2 absolute -bottom-2 -right-1 border-gray-900 z-40" style={{ height: 15, width: 15 }}></div> : null }}
                    >{ blockType() }  </Resizable>
            </div> 
        </div>
    )
}
