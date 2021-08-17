import React from 'react'

function PropertyHeading({ title, properties }) {
    return (
        <>
            <div className="text-gray-500 border-b font-semibold border-gray-100 py-1">{title}</div>
            {
                properties && properties.map((property, index ) => {
                    return <div key={index} className="flex w-full justify-between py-2 items-center">
                        {property.name ? <span className="text-sm text-gray-300">{property.name}</span> : null}
                        {property.children}
                    </div>
                })
            }
        </>
    )
}

export default PropertyHeading
