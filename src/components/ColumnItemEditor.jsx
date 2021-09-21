import React, { useContext } from 'react'
// import ContentEditable from 'react-contenteditable'
import CloseIcon from './../assets/icons/close-white.svg';
import { ReactSVG } from 'react-svg';
import CropIcon from './../assets/icons/crop.svg';
import { GlobalContext } from '../store/GlobalState';
import ImageCropper from './modal/ImageCropper';
import ContentEditable from 'react-contenteditable';
import { useDrag, useDrop } from 'react-dnd';
import { v4 } from 'uuid'

export default function ColumnItemEditor(props) {

    const { selectItem, selectedItem, openModal, removeClass, loadPresentation, presentation } = useContext(GlobalContext);

      const handleDrop = (item) => {
        item.id = v4()
        presentation.items[props.index] = item
        loadPresentation(presentation)
    }
    // eslint-disable-next-line
    const [collected, dragRef] = useDrag(() => ({
        type: 'BLOCK',
        item: props.block,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))


    const [dropTextBoxCollected, dropTextBoxRef] = useDrop(() => ({
       
        accept: ['ASSET'],
        drop: (item, monitor) => {
            console.log(item)
            handleDrop(item)
        },
        collect: (monitor) => ({

          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        })
      }))

    const blockType = () => {
        switch (props.block.type) {
            case 'text':
                return <div id={props.block.id} className={props.block.classlist && props.block.classlist.toString().replace(',', ' ')}>{props.block.text}</div>
            case 'textbox': 
                return <div 
                        ref={dropTextBoxRef}
                        className={`bg-opacity-10 p-2 border-2 border-dashed ${dropTextBoxCollected.isOver ? 'bg-indigo-100 border-indigo-200' : 'bg-gray-100 border-gray-100'}`}
                        style={{ height: dropTextBoxCollected.isOver ? 200 : 'auto', minHeight: props.block.text ? 'auto' : 100  }}
                        >
                        <div ref={dragRef} className={props.block.classlist.toString().replace(',', ' ')}>
                            <ContentEditable
                                tagName="div"
                                className={props.block.text ? '' : 'text-gray-300'}
                                id={props.block.id}
                                html={props.block.text ? props.block.text : 'Drop or enter text here...'}
                            />
                        </div>
                    </div>
            case 'image':
                return <div className="my-2">
                            <img className={props.block.classlist && props.block.classlist.join(' ')} alt={props.block.name} src={props.block.blob} ref={dragRef} />
                            <p className="mt-2 text-gray-500">{props.block.caption}</p>
                        </div>
            case 'container':
                return <div  id={props.block.id} className={ props.block.classlist && props.block.classlist.toString().replace(',', ' ')}>{
                    props.block && props.block.items && props.block.items.map((item, i) => {
                        if (item.type === 'text') {
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
                                    return <button key={i} className="text-white text-xs py-1 px-2 mr-1 bg-indigo-600 rounded-sm mb-0 inline-flex items-center">.{c}<span className="ml-2"><img style={{ width: 10 }} src={CloseIcon} alt="remove class" onClick={() => removeClass(props.block, c, presentation)} /></span></button>
                                })
                            }
                        </div> : null
                }


                <div className={`border-indigo-300 bg-white border-dashed rounded-sm relative w-full ${selectedItem && selectedItem.id === props.block.id ? 'border-2 mb-3' : 'border-0 mb-0 p-0'} `}>{blockType()}

                    {
                        selectedItem && selectedItem.id === props.block.id ?
                            <div className="absolute -right-4 top-1/2 p-1 transform -translate-y-1/2  rounded inline-flex flex-col items-center justify-center z-20">
                                 {
                                    props.block.type === 'image' ?
                                        <button
                                            onClick={(e) => {
                                                openModal(<ImageCropper />, 0, "0%")
                                            }}
                                            className="p-2 bg-white shadow-sm hover:bg-gray-50 rounded">
                                            <ReactSVG src={CropIcon}
                                                beforeInjection={(svg) => {
                                                    svg.setAttribute('style', 'width: 16px; height: 16px;')
                                                }}
                                            />
                                        </button> :
                                        null
                                }

                            </div> : null
                    }
                </div>
            </div>
        </div>

    )
}
