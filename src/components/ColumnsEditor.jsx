import React from 'react'
import { useContext } from 'react'
import { ReactSVG } from 'react-svg'
import { useDrop } from 'react-dnd'
import { GlobalContext } from '../store/GlobalState'
import ColumnItemEditor from './ColumnItemEditor'
import TrashIcon from './../assets/icons/trash.svg';
export default function ColumnsEditor(props) {

    const { selectComponent, component, removeItem, presentation } = useContext(GlobalContext)


    // const handleOnDrop = (event) => {
    //     event.preventDefault()
    //     if (event && selectedItem) {
    //         if (event.target.id.includes('placeholder')) {
    //            // let id = event.target.id.split('placeholder-')[1];

    //         }

    //     }
    // }

    const [{ isOver }, drop] = useDrop(() => ({
       
        accept: 'ASSET',
        drop: (item, monitor) => {
            console.log(item)
        },
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        })
      }))

    


    return (
        <div id={props.item.id} >

            <div
                onClick={() => selectComponent(props.item)}
                className={`cursor-default relative w-full`}>

                <div className={props.item.classlist}>
                    {
                        props.item.items && props.item.children.length > 0 && props.item.children.map((column, index) => {

                            return <div key={index} 
                            className={`${column && column.classlist} border-2 border-gray-100 border-dashed relative ${component && props.item.id === component.id ? 'border-2 border-indigo-300' : ''} ${isOver ? 'bg-indigo-100 bg-opacity-20 border-indigo-100': ''}`}  ref={drop} style={{ minHeight: column.items && column.items.length > 0 ? 'auto' : 200}}>
                               
                                    {
                                        column.items && column.items.length > 0 && column.items.map((child, i) => {
                                            return <ColumnItemEditor key={i} block={child} index={i} />
                                        })
                                    }
                            </div>

                        })
                    }
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
