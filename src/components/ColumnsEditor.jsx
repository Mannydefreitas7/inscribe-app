import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ReactSVG } from 'react-svg'
import { useDrop } from 'react-dnd'
import { GlobalContext } from '../store/GlobalState'
import ColumnItemEditor from './ColumnItemEditor'
import TrashIcon from './../assets/icons/trash.svg';
import { Resizable } from 're-resizable';
export default function ColumnsEditor(props) {

    const { selectComponent, component, removeItem, presentation, loadPresentation, onResizeStop } = useContext(GlobalContext)

    const [colOneCollected, dropColumnOneRef] = useDrop(() => ({

        accept: ['ASSET', 'BLOCK'],

        drop: (item, monitor) => {
            console.log(item)
            handleDrop(item, 'one')
        },
        collect: (monitor) => ({

            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }))

    useEffect(() => {
        if (component && component.id === props.item.id) {
            onResizeStop(props.item.children[0].properties.width)
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    const [colTwoCollected, dropColumnTwoRef] = useDrop(() => ({

        accept: ['ASSET', 'BLOCK'],

        drop: (item, monitor) => {
            console.log(item)
            handleDrop(item, 'two')
        },
        collect: (monitor) => ({

            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }))

    const columnOneClassList = props.item.children && props.item.children.length > 0 && props.item.children[0].classlist
    const hasChildren = props.item.children && props.item.children.length > 1
    const columnOneHasItems = hasChildren && props.item.children[0].children && props.item.children[0].children.length > 0
    const columnTwoHasItems = hasChildren && props.item.children[1].children && props.item.children[1].children.length > 0

    const handleDrop = (item, column) => {

        switch (column) {
            case 'one':
                props.item.children[0].children.push(item)
                break;
            case 'two':
                props.item.children[1].children.push(item)
                break;
            default:
                break;
        }
        presentation.items = presentation.items.filter(el => el.id !== item.id)
      //  presentation.items[props.index] = props.item
        loadPresentation(presentation)
    }

    const onResize = (event, direction, el, delta) => {
        let value = Number(el.style.width.replace('%', ''))
        let className = ''
         if (value >= 70) {
             className = 'SevenEight'
             onResizeStop('86%')
         } else if (value >= 60 && value < 70) {
             className = 'SixEight'
             onResizeStop('74%')
         } else if (value > 50 && value < 60) {
             className = 'FiveEight'
             onResizeStop('61%')
         } else if (value > 40 && value <= 50) {
             className = 'Half'
             onResizeStop('49.5%')
         } else if (value > 30 && value < 40) {
             className = 'ThreeEight'
             onResizeStop('36%')
         } else if (value > 20 && value < 30) {
             className = 'TwoEight'
             onResizeStop('24%')
         } else {
             className = 'OneEight'
             onResizeStop('12%')
         }
         if (props.item.children.length > 0) {
             props.item.children[0].properties.width = el.style.width
             props.item.children[0].description = className
         }
         
         loadPresentation(presentation)
     }


    return (
        <div id={props.item.id}>

            <div
                onClick={() => selectComponent(props.item)}
                className={`cursor-default relative w-full`}>
                <div className={props.item.classlist}>


                    <Resizable
                        bounds={'parent'}
                        onResizeStop={onResize}
                        size={{
                            width: props.item.children[0].properties.width,
                            height: 'auto',
                        }}
                        minHeight={columnOneHasItems ? 'auto' : 200}
                        className={`border-2 border-gray-100 border-dashed relative ${component && props.item.id === component.id ? 'border-2 border-indigo-300' : ''} ${colOneCollected.isOver ? 'bg-indigo-100 bg-opacity-20 border-indigo-100' : ''} ${columnOneClassList}`}

                        enable={{ right: true }}
                        handleComponent={{ right: component && props.item.id === component.id ? <div className="bg-white shadow-sm rounded-full border-2 absolute top-1/2 -right-2 border-gray-900 z-40" style={{ height: 15, width: 15 }}></div> : null }}
                    >
                        <div ref={dropColumnOneRef} className="h-full">
                            {
                                columnOneHasItems && props.item.children[0].children.map((child, i) => {
                                    return <ColumnItemEditor key={child.id} block={child} index={i} />
                                })
                            }
                        </div>
                        
                    </Resizable>
                            

                    <div
                        className={`border-2 border-gray-100 border-dashed relative ${component && props.item.id === component.id ? 'border-2 border-indigo-300' : ''} ${colTwoCollected.isOver ? 'bg-indigo-100 bg-opacity-20 border-indigo-100' : ''} w-full`} ref={dropColumnTwoRef} style={{ minHeight: columnTwoHasItems ? 'auto' : 200 }}>
                        {
                            columnTwoHasItems && props.item.children[1].children.map((child, i) => {
                                return <ColumnItemEditor key={child.id} block={child} index={i} />
                            })
                        }
                        
                    </div>

                    {
                        component && component.id === props.item.id ?
                            <div className="absolute -right-4 top-1/2 p-1 transform -translate-y-1/2  rounded inline-flex flex-col items-center justify-center z-20">
                                <button className={`p-2 bg-white hover:bg-gray-50 rounded cursor-pointer shadow`} onClick={() => {
                                    removeItem(props.item, presentation)

                                }}>
                                    <ReactSVG src={TrashIcon} />
                                </button>
                            </div> :
                            null
                    }

                </div>

            </div>
        </div>
    )
}
