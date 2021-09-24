import React from 'react'
import { useContext, useRef } from 'react'
import Collaspible from '../Collaspible';
import ColorPicker from './../extensions/ColorPicker';
import ColorPickerButton from './../buttons/ColorPickerButton';
import PropertyHeading from './../extensions/PropertyHeading';
import { GlobalContext } from './../../store/GlobalState';
import CropIcon from './../../assets/icons/crop.svg';
import TextArea from '../inputs/TextArea';
import ImageCropper from '../modal/ImageCropper';
import SecondaryButton from '../buttons/SecondaryButton';
import { NavLink } from 'react-router-dom';
import localforage from 'localforage';
import ColumnsResize from './ColumnsResize';
import Togglebuttons from '../buttons/Togglebuttons';
import TextSizeProperties from './TextSizeProperties';
import TextFormatProperties from './TextFormatProperties';


export default function Properties() {

    const { component, openModal, selectedItem, presentation, loadPresentation } = useContext(GlobalContext)
    const captionRef = useRef(null)

    const addFloatClass = (classname) => {
        if (selectedItem) {
            let currentIndex = selectedItem.classlist.findIndex(el => el.includes('float'));
                if (currentIndex >= 0) {
                    selectedItem.classlist[currentIndex] = classname
                } else {
                    selectedItem.classlist.push(classname)
                }
               loadPresentation(presentation)
        }
        
    }

    const selectedFloat = () => {
        if (selectedItem) {
        let currentIndex = selectedItem.classlist.findIndex(el => el.includes('float'));
            if (currentIndex >= 0) {
                let name = selectedItem.classlist[currentIndex];
                return name
            }
        }
      return null
    }

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
                children: <TextFormatProperties />
            },
            {
                name: 'Size',
                children: <TextSizeProperties />
            }
        ]
    }

    const prototypeProperties = {
        title: 'Prototype',
        properties: [
            {
                name: 'Navigate',
                children: <NavLink to="/home" className="inline-flex items-center border-2 rounded-sm border-gray-100 hover:bg-gray-100 text-sm text-gray-500 px-2 py-1">Dashboard</NavLink>
            },
            {
                name: 'Data',
                children: <SecondaryButton label="Reset All" onClick={() => {
                    localforage.clear((err) => {
                        if (!err) {
                            loadPresentation()
                        }
                    })
                }} />
            }
        ]
    }

    const borderProperties = {
        title: 'Border',
        properties: [
            {
                name: 'Color',
                children: <SecondaryButton label="Black" />
            },
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

    const columnsProperties = {
        title: 'Columns',
        properties: [
            {
                children: <ColumnsResize />
            }
        ]
    }

    const imageProperties = {
        title: 'Image',
        properties: [
            {
                name: 'Crop',
                children:
                <SecondaryButton 
                    label={selectedItem && selectedItem.crop ? selectedItem.crop : 'Select'}
                    icon={CropIcon}
                    onClick={() => openModal(<ImageCropper selectedItem={selectedItem} />, 0, "0%")}
                />
            },
            {
                name: 'Float',
                children: <Togglebuttons 
                    selection={{id: selectedFloat() ? selectedFloat() : 'float-none'}}
                items={[
                    {
                        name: 'left',
                        id: 'float-left',
                        onClick: () => { addFloatClass('float-left') }
                    },
                    {
                        name: 'right',
                        id: 'float-right',
                        onClick: () => { addFloatClass('float-right') }
                    },
                    {
                        name: 'none',
                        id: 'float-none',
                        onClick: () => { addFloatClass('float-none') }
                    },
                    
                ]} />
            },
            {
                children: <TextArea
                    innerRef={captionRef}
                    label={'Caption'}
                    defaultValue={selectedItem ? selectedItem.caption : ''}
                    onChange={(event) => {
                        selectedItem.caption = captionRef.current.value;
                        loadPresentation(presentation)
                    }}
                    placeholder="Enter image caption..."
                />
            }
        ]
    }


    return (
        <Collaspible title="Properties" >
            
            

            <PropertyHeading title={borderProperties.title} properties={borderProperties.properties} />

            {
                
                selectedItem && (selectedItem.type.includes('text') || selectedItem.type.includes('container')) ?
                <PropertyHeading title={textProperties.title} properties={textProperties.properties} /> : null
            }

            {
                
                component && component.type === 'columns' ?
                <PropertyHeading title={columnsProperties.title} properties={columnsProperties.properties} /> : null
            }
            {
                selectedItem && selectedItem.type === 'image' ?
                <PropertyHeading title={imageProperties.title} properties={imageProperties.properties} /> : null
            }
            <PropertyHeading title={prototypeProperties.title} properties={prototypeProperties.properties} />

        </Collaspible>
    )
}
