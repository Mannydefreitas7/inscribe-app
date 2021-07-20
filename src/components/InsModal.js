import React from 'react'
import ImageCropper from './ImageCropper'

export default function InsModal() {
    return (
        <div className="bg-black z-50 bg-opacity-40 fixed h-full w-full left-0 top-0">
            <div className="absolute border border-gray-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 shadow rounded-sm w-2/3">
                <div className="border-b border-gray-100 pl-4 pr-3 py-3 flex justify-between">
                    <span className="text-gray-300 font-semibold">Modal</span>
                </div>
                <ImageCropper />
                
            </div>
        </div>
    )
}
