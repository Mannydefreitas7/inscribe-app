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

    const { setImageCrop, closeModal, setImageBlob, presentation } = useContext(GlobalContext);
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
        // eslint-disable-next-line
    }, [cropIndex])

    return (
    <div style={{ maxWidth: window.screen.width / 1.5 }}>
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
                        locked={true}
                        ref={elementRef}
                        src={selectedItem.raw}
                        crop={currentCrop}
                        onComplete={(crop, percent) => {
                            setImageCrop(selectedItem, crop, selectedItem.crops[cropIndex].id, presentation)
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
            <div className="py-2 flex justify-between items-center" style={{ minWidth: 900, maxWidth: '100%' }}>
                <div className="flex">
                    <Togglebuttons 
                    items={selectedItem.crops.map((_crop, i) => {
                        return {
                            id: _crop.id,
                            name: _crop.name,
                                onClick: () => {
                                    setCropIndex(i)
                                    setCurrentCrop({
                                        ...selectedItem.crops[i],
                                        y: selectedItem.crops[i].y,
                                        x: selectedItem.crops[i].x,
                                        width: selectedItem.crops[i].width,
                                        height: selectedItem.crops[i].height,
                                })
                            }
                        }
                    })} 
                    selection={selectedItem.crops[cropIndex]} 
                    />
                </div>
                <div className="flex">
                    <SecondaryButton
                        label="Cancel"
                        onClick={() => closeModal()}
                    />
                    <PrimaryButton
                    label="Select Crop"
                    bgColor="indigo"
                    onClick={() => {
                        getCroppedImg(elementRef.current.imageRef, selectedItem.crops[cropIndex])
                            .then(blob => {
                                
                                setImageBlob(selectedItem, blob, selectedItem.crops[cropIndex].id, selectedItem.crops[cropIndex].name, presentation)
                               
                            })
                            .then(() => closeModal())
                    }}
                    />

                </div>
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