import React, { useContext, useRef, useState } from 'react'
import ReactCrop from 'react-image-crop';
import { GlobalContext } from '../store/GlobalState';
import 'react-image-crop/dist/ReactCrop.css';
import { useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import CloseIcon from './../assets/icons/close.svg';
import HeaderTitle from './HeaderTitle';


export default function ImageCropper() {

    const { selectedItem, setImageCrop, closeModal, setImageBlob } = useContext(GlobalContext);
    const [cropIndex, setCropIndex] = useState(0);
    const [currentCrop, setCurrentCrop] = useState({
        y: selectedItem.crops[cropIndex].y,
        x: selectedItem.crops[cropIndex].x,
        width: selectedItem.crops[cropIndex].width,
        height: selectedItem.crops[cropIndex].height,
    });

    const elementRef = useRef();

    useEffect(() => {
        setCurrentCrop({
            y: selectedItem.crops[cropIndex].y,
            x: selectedItem.crops[cropIndex].x,
            width: selectedItem.crops[cropIndex].width,
            height: selectedItem.crops[cropIndex].height,
        })
        
    }, [cropIndex])

    return (<>
        <HeaderTitle title="Image Crop">
        <button
            onClick={() => closeModal()}
            className="p-2 hover:bg-gray-900 rounded">
            <ReactSVG src={CloseIcon} />
        </button>
        </HeaderTitle>
        <div className="p-4 w-full">
            {
                selectedItem && selectedItem.raw ?
                    <ReactCrop
                        className="rounded w-full"
                        locked={true}
                        ref={elementRef}
                        src={selectedItem.raw}
                        crop={currentCrop}
                        onComplete={(crop, percent) => {
                            console.log(crop)
                            setImageCrop(selectedItem, crop, currentCrop.id)
                        }}
                        onChange={newCrop => {
                            setCurrentCrop({
                                ...selectedItem.crops[cropIndex],
                                width: selectedItem.crops[cropIndex].width,
                                height: selectedItem.crops[cropIndex].height,
                                x: newCrop.x,
                                y: newCrop.y
                            })

                        }} /> : null
            }
            <div className="py-2 flex justify-between" style={{ minWidth: 900, maxWidth: '100%' }}>
                <div className="flex">
                    {
                        selectedItem && selectedItem.crops.map((_crop, i) => {
                            return <button
                                onClick={() => {
                                    setCropIndex(i)
                                    setCurrentCrop({
                                        ...selectedItem.crops[i],
                                        y: selectedItem.crops[i].y,
                                        x: selectedItem.crops[i].x,
                                        width: selectedItem.crops[i].width,
                                        height: selectedItem.crops[i].height,
                                    })
                                }}
                                key={i}
                                className={`px-2 py-1 rounded-sm ${cropIndex === i ? 'bg-gray-700 text-gray-50' : 'text-gray-400 bg-gray-50'} border border-gray-100 mr-1`}>{_crop.name}</button>
                        })
                    }
                </div>
                <div className="flex">
                    <button className="px-4 py-2 text-gray-500 bg-gray-50 hover:bg-gray-100 rounded border-2 border-gray-100 mr-1" onClick={() => closeModal()}>Cancel</button>
                    <button
                        onClick={() => {
                            getCroppedImg(elementRef.current.imageRef, selectedItem.crops[cropIndex])
                                .then(blob => {
                                    setImageBlob(selectedItem, blob, selectedItem.crops[cropIndex].id)
                                })
                                .then(() => closeModal())
                        }}
                        className="px-4 py-2 bg-indigo-700 text-gray-100 font-medium rounded">Select Crop</button>
                </div>
            </div>
        </div>
        </>
    )
}
function getCroppedImg(_image, crop, fileName) {

    const canvas = document.createElement("canvas");
    // As a blob
    return new Promise((resolve, reject) => {

            const scaleX = _image.naturalWidth / _image.width;
            const scaleY = _image.naturalHeight / _image.height;

            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d");

            // New lines to be added
            const pixelRatio = window.devicePixelRatio;
            canvas.width = crop.width * pixelRatio;
            canvas.height = crop.height * pixelRatio;
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(
                _image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );
            const base64Image = canvas.toDataURL("image/jpeg", 1);
            resolve(base64Image);
    })

}