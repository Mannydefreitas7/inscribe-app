import React from 'react'
import { useContext } from 'react';
import { GlobalContext } from './../../store/GlobalState';
import Collaspible from './../Collaspible';
import Component from './Component';
import { v4 } from 'uuid';

export default function Components() {

    const { addComponent, closeModal } = useContext(GlobalContext);

    const components = [
        {
            id: v4(),
            classlist: ["columns"],
            data: "./../images/columns.jpg",
            date: new Date().toDateString(),
            text: "Columns",
            description: 'Container',
            type: 'columns',
            children: [
                {
                    id: v4(),
                    index: 0,
                    text: "Column One",
                    description: "Half",
                    classlist: ["oneHalf"],
                    type: 'column',
                    children: []
                },
                {
                    id: v4(),
                    index: 1,
                    text: "Column Two",
                    description: "Half",
                    classlist: ["oneHalf"],
                    type: 'column',
                    children: []
                }
            ]
        },
        {
            id: v4(),
            classlist: ["backgroundContainer"],
            data: "./../images/background.jpg",
            date: new Date().toDateString(),
            text: "Background",
            description: 'Background',
            type: 'background',
            children: [
                {
                    id: v4(),
                    index: 0,
                    text: "Background Image",
                    description: "Background Image",
                    classlist: ["backgroundItem"],
                    data: null,
                    type: 'image'
                },
                {
                    id: v4(),
                    index: 1,
                    text: "Foreground",
                    description: "Foreground items",
                    classlist: ["foreground"],
                    type: 'container',
                    children: []
                }
            ]
        },
        {
            id: v4(),
            classlist: ["boxContainer"],
            data: "./../images/box.jpg",
            date: new Date().toDateString(),
            text: "Box",
            description: 'Box',
            type: 'box',
            title: null,
            children: []
        }
    ]

    return (
        <Collaspible title="Components">
            <div className="grid grid-cols-3 gap-1">
                {
                    components && components.map(component => {
                        return <Component 
                        key={component.id}
                        component={component} 
                        onClick={() => {
                            addComponent(component)
                            closeModal()
                        }}/>
                    })
                }
            </div>
        </Collaspible>
    )
}
