import React from 'react'

import SecondaryButton from '../buttons/SecondaryButton'

import PropertyHeading from '../extensions/PropertyHeading'

function FloatProperties(props) {



   


    const layoutProperties = {
        title: 'Layout',
        properties: [
            {
                name: 'Width',
                children: <SecondaryButton label="Small" />
            },
            {
                name: 'Style',
                children: <SecondaryButton label="Small" />
            },
            {
                name: 'Sides',
                children: <SecondaryButton label="Start" />
            }
        ]
    }

    return (
        <PropertyHeading title={layoutProperties.title} properties={layoutProperties.properties} />
    )
}

export default FloatProperties
