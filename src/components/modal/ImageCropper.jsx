import React, { useContext, useRef, useState } from 'react'
import ReactCrop from 'react-image-crop';
import { GlobalContext } from '../../store/GlobalState';
import 'react-image-crop/dist/ReactCrop.css';
import { useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import CloseIcon from './../../assets/icons/close.svg';
import HeaderTitle from './HeaderTitle';
import Togglebuttons from '../buttons/Togglebuttons';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';


export default function ImageCropper({selectedItem}) {

    const { closeModal, setImageBlob, presentation } = useContext(GlobalContext);
    const [cropIndex, setCropIndex] = useState(0);
    const [currentCrop, setCurrentCrop] = useState({
        y: selectedItem.crops[cropIndex].y,
        x: selectedItem.crops[cropIndex].x,
        aspect: selectedItem.crops[cropIndex].aspect,
      //  width: selectedItem.crops[cropIndex].width,
       height: selectedItem.crops[cropIndex].height,
    });

    const elementRef = useRef();

    useEffect(() => {
        setCurrentCrop({
            y: selectedItem.crops[cropIndex].y,
            x: selectedItem.crops[cropIndex].x,
            aspect: selectedItem.crops[cropIndex].aspect,
           // width: selectedItem.crops[cropIndex].width,
           height: selectedItem.crops[cropIndex].height,
        })
        // eslint-disable-next-line
    }, [cropIndex])

    return (
    <div style={{ maxWidth: window.screen.width / 3 }}>
        <HeaderTitle title="Image Crop">
        <button
            onClick={() => closeModal()}
            className="p-2 hover:bg-gray-100 rounded">
            <ReactSVG src={CloseIcon} />
        </button>
        </HeaderTitle>
        <div className="p-4 w-full">
            {
                selectedItem && selectedItem.raw ?
                    <ReactCrop
                        className="rounded w-full"
                   
                        ref={elementRef}
                        src={selectedItem.raw}
                        crop={currentCrop}
                        onComplete={(crop, percent) => {
                           
                                selectedItem.crops[cropIndex] = {
                                    ...selectedItem.crops[cropIndex],
                                    ...crop
                                }
                          
                        }}
                        onChange={newCrop => {
                            setCurrentCrop(newCrop)
                        }} /> : null
            }
            <div className="py-2" style={{ maxWidth: '100%' }}>
                    <HeaderTitle title="Crops"/>
                    {
                        selectedItem && selectedItem.crops && selectedItem.crops.map((_crop, i) => (
                            <div className="p-2 flex justify-between items-center hover:bg-black hover:bg-opacity-5" onClick={() => {
                                setCropIndex(i)
                                setCurrentCrop(selectedItem.crops[i])
                            }}>
                                <div className="flex items-center w-full">
                                {
                                    _crop.blob ? <img src={_crop.blob} style={{ maxHeight: 40 }} alt="" /> : <div className="bg-gray-200 flex flex-1 justify-center items-center" style={{ maxHeight: 40, width: _crop.width, maxWidth: 100, height: _crop.height }}>
                                        <span className="text-gray-500 text-sm">Empty</span>
                                    </div>
                                }
                                    <span className="ml-2 text-sm text-gray-600">{_crop.name}</span>
                                </div>
                                <div className="flex items-center">
                                <SecondaryButton
                                    label="Update"
                                    onClick={() => {
                                        getCroppedImg(elementRef.current.imageRef, selectedItem.crops[i])
                                        .then(blob => {
                                            setImageBlob(selectedItem, blob, selectedItem.crops[i].id, selectedItem.crops[i].name, presentation)
                                        })
                                    }}
                                />
                                <SecondaryButton
                                    label="Add"
                                    onClick={() => {
                                        getCroppedImg(elementRef.current.imageRef, selectedItem.crops[i])
                                        .then(blob => {
                                            setImageBlob(selectedItem, blob, selectedItem.crops[i].id, selectedItem.crops[i].name, presentation)
                                        })
                                        .then(() => closeModal())
                                    }}
                                    />
                                    </div>
                            </div>
                        ))
                    }

            </div>
        </div>
        </div>
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