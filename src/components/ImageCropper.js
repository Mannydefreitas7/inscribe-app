import React, { useContext, useState } from 'react'
import ReactCrop from 'react-image-crop';
import { GlobalContext } from '../store/GlobalState';
import 'react-image-crop/dist/ReactCrop.css';



export default function ImageCropper() {

    const { selectedItem, presentation } = useContext(GlobalContext);
    const _crops = [
        {
            name: 'SQR',
            height: 200,
            width: 200,
            unit: "px",
        },
        {
            name: 'PNR',
            height: 70,
            width: 100,
            unit: '%',
        },
        {
            name: 'LSR',
            height: 90,
            width: 100,
            unit: '%',
        }
    ]
    const [crops, setCrops] = useState(_crops);
    const [selectedCrop, setSelectedCrop] = useState({
        x: 0,
        y: 0,
        width: 200,
        height: 200
    });

    return (
        <div className="p-4">
            {
                presentation && presentation.items ?
                <ReactCrop 
                className="rounded"
                locked={true}
                src={presentation.items[0].blob} crop={selectedCrop} onChange={newCrop => {
                    setSelectedCrop({
                        ...selectedCrop,
                        x: newCrop.x,
                        y: newCrop.y
                    })
                }} /> : null
            }
            <div className="py-2">
                {
                    crops && crops.map((_crop, i) => {
                        return <button 
                        onClick={() => {
                            setSelectedCrop({
                                x: 0
                            })
                        }}
                        key={i} 
                        className="px-2 py-1 rounded-sm text-gray-400 bg-gray-50 border border-gray-100 mr-1">{_crop.name}</button>
                    })
                }
            </div>
            <button>Done</button>
        </div>
    )
}

function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
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
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  
    // As Base64 string
    // const base64Image = canvas.toDataURL("image/jpeg");
    // return base64Image;
  
    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          blob.name = fileName;
          resolve(blob);
        },
        "image/jpeg",
        1
      );
    })
}