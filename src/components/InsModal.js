import React from 'react'
import { useContext } from 'react'
import { ReactSVG } from 'react-svg';
import { GlobalContext } from '../store/GlobalState'

import CloseIcon from './../assets/icons/close.svg';

export default function InsModal() {
    const { modalChildren, closeModal } = useContext(GlobalContext)
    return (
        <div className="bg-black z-50 bg-opacity-80 fixed h-full w-full left-0 top-0">
            <div className="absolute border border-gray-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 shadow-lg rounded-sm">
                <div className="border-b border-gray-100 pl-4 pr-3 py-3 flex justify-between items-center">
                    <span className="text-gray-300 font-semibold">Edit</span>
                    <button
                    onClick={() => closeModal()}
                    className="p-2 hover:bg-gray-100 rounded">
                    <ReactSVG src={CloseIcon} />
                    </button>
                </div>
                {modalChildren}
            </div>
        </div>
    )
}
