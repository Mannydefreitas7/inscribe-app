import React from 'react'
import { useContext } from 'react';
import { GlobalContext } from './../../store/GlobalState';
import { v4 } from 'uuid';
import PlusIcon from './../../assets/icons/plus.svg';
import { useDrag } from 'react-dnd';

function ComponentList() {

  
    const components = [
        {
            id: v4(),
            classlist: [],
            data: "./assets/images/textbox.jpg",
            date: new Date().toDateString(),
            text: null,
            description: "Text Box",
            type: 'textbox'
        },
        {
            id: v4(),
            classlist: [],
            data: "./assets/images/imagebox.jpg",
            date: new Date().toDateString(),
            text: null,
            description: "Image",
            type: 'imageBox',
            blob: null,
            height: null,
            width: null,
            extension: 'JPEG',
            raw: null,
            name: null,
            size: null,
            crops: []
        },
        {
            id: v4(),
            classlist: ["columns"],
            data: "./assets/images/columns.jpg",
            date: new Date().toDateString(),
            text: "Columns",
            description: 'Columns',
            type: 'columns',
            children: [
                {
                    id: v4(),
                    index: 0,
                    text: "Column One",
                    description: "Half",
                    classlist: ["col-oneHalf"],
                    type: 'column',
                    properties: {
                        width: '49%'
                    },
                    children: []
                },
                {
                    id: v4(),
                    index: 1,
                    text: "Column Two",
                    description: "Half",
                    classlist: ["col-oneHalf"],
                    type: 'column',
                    children: []
                }
            ]
        },
        // {
        //     id: v4(),
        //     classlist: ["backgroundContainer"],
        //     data: "./assets/images/background.jpg",
        //     date: new Date().toDateString(),
        //     text: "Background",
        //     description: 'Background',
        //     type: 'background',
        //     children: [
        //         {
        //             id: v4(),
        //             index: 0,
        //             text: "Background Image",
        //             description: "Background Image",
        //             classlist: ["backgroundItem"],
        //             data: null,
        //             type: 'image'
        //         },
        //         {
        //             id: v4(),
        //             index: 1,
        //             text: "Foreground",
        //             description: "Foreground items",
        //             classlist: ["foreground"],
        //             type: 'container',
        //             children: []
        //         }
        //     ]
        // },
        // {
        //     id: v4(),
        //     classlist: ["boxContainer"],
        //     data: "./assets/images/box.jpg",
        //     date: new Date().toDateString(),
        //     text: "Box",
        //     description: 'Box',
        //     type: 'box',
        //     title: null,
        //     children: []
        // }
    ]
    return (
        <div>
            {
                components && components.map(component => {

         

                    return <ComponentListItem
                        key={component.id}
                        component={component}
                    />
                })
            }
        </div>
    )
}

function ComponentListItem({component}) {

    const { addComponent, presentation } = useContext(GlobalContext);
    const [{ opacity }, dragRef] = useDrag(() => ({
        type: 'COMPONENT',
        item: component,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))
    return (
        <div
            key={component.id}
           
            className="flex items-center cursor-move rounded-sm justify-between py-2 px-3 hover:bg-black hover:bg-opacity-5"
            onClick={() => {
                addComponent(component, presentation)
            }}>
                <div className="inline-flex items-center">
                    <img style={{ width: 70 }} src={component.data} alt={component.text} />
                    <span className="text-gray-600 text-sm ml-3">{component.description}</span>
                </div>
                <img className="opacity-0 hover:opacity-100 group-hover:opacity-30" src={PlusIcon} alt=""/>
            </div>
    )
}
   


export default ComponentList
