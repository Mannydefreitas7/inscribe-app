import React from 'react'
import Collaspible from '../Collaspible'
import PropertyHeading from './PropertyHeading'

export default function ImageProperties() {

    const textProperties = {
        title: 'Text',
        properties: [
            {
                name: 'Color',
                children: <button></button>
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

    const imageProperties = {
        title: 'Image',
        properties: [
            {
                name: 'Crop',
                children: <button></button>
            },
            {
                name: 'Caption',
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

    return (
        <Collaspible title="Image">
            <PropertyHeading title={textProperties.title} properties={textProperties.properties} />
        </Collaspible>
    )
}
