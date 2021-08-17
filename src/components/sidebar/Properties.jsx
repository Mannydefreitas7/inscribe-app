import React from 'react'
import { useContext } from 'react'
import Collaspible from '../Collaspible';
import ColorPicker from './../extensions/ColorPicker';
import ColorPickerButton from './../buttons/ColorPickerButton';
import PropertyHeading from './../extensions/PropertyHeading';
import { GlobalContext } from './../../store/GlobalState';

export default function Properties() {

    const { selectedItem, component, openModal } = useContext(GlobalContext)

    const textProperties = {
        title: 'Text',
        properties: [
            {
                name: 'Color',
                children: <ColorPickerButton onClick={(e) => {
                    openModal(<ColorPicker />, e.clientX - 300, e.clientY - 20)
                }} />
            },
            {
                name: 'Style',
                children: <button>Bold</button>
            },
            {
                name: 'Size',
                children: <button>Small</button>
            },
            {
                name: 'Letter Spacing',
                children: <button>Small</button>
            }
        ]
    }

    const borderProperties = {
        title: 'Border',
        properties: [
            {
                name: 'Color',
                children: <button 
                onClick={(e) => {
                    openModal(<ColorPicker />, e.clientX, e.clientY)
                }}>Test</button>
            },
            {
                name: 'Width',
                children: <button>Bold</button>
            },
            {
                name: 'Style',
                children: <button>Small</button>
            },
            {
                name: 'Sides',
                children: <button>Small</button>
            }
        ]
    }

    const columnsProperties = {
        title: 'Columns',
        properties: [
            {
                children: <button>test</button>
            }
        ]
    }

    return (
        <Collaspible title="Properties" >
            
            <PropertyHeading title={textProperties.title} properties={textProperties.properties} />

            <PropertyHeading title={borderProperties.title} properties={borderProperties.properties} />

            {
                
                component && component.type === 'columns' ?
                <PropertyHeading title={columnsProperties.title} properties={columnsProperties.properties} /> : null
            }

        </Collaspible>
    )
}
