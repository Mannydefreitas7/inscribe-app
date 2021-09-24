import React, { useContext } from 'react'
import InsDropDown from './../modal/InsDropDown';
import SecondaryButton from './../buttons/SecondaryButton';
import { GlobalContext } from '../../store/GlobalState';

export default function TextSizeProperties() {

    const { selectedItem, presentation, loadPresentation }  = useContext(GlobalContext)

    const textStyles = [
        {
            text: 'Title',
            description: 'title',
            id: 'text-title',
            action: () => changeTextSize('text-title')
        },
        {
            text: 'Subheading 1',
            description: 'subheading-1',
            id: 'text-subheading-1',
            action: () => changeTextSize('text-subheading-1')
        },
        {
            text: 'Subheading 2',
            description: 'subheading-2',
            id: 'text-subheading-2',
            action: () => changeTextSize('text-subheading-2')
        },
        {
            text: 'Subheading 3',
            description: 'subheading-3',
            id: 'text-subheading-3',
            action: () => changeTextSize('text-subheading-3')
        },
        {
            text: 'paragraph',
            description: 'paragraph',
            id: 'text-paragraph',
            action: () => changeTextSize('text-paragraph')
        },
        {
            text: 'caption',
            description: 'caption',
            id: 'text-caption',
            action: () => changeTextSize('text-caption')
        },
        {
            text: 'opening',
            description: 'opening',
            id: 'text-opening',
            action: () => changeTextSize('text-opening')
        }
    ]

    const shouldUpdate = () => {
        if (presentation && presentation.items && presentation.items.length > 0) {
           
            if (selectedItem.classlist.join(' ').includes('subheading')) {
                let index = selectedItem.classlist.findIndex(el => el.includes('subheading'))
                let subheadings = presentation.items.filter(el => el.classlist.includes(selectedItem.classlist[index]));
               
                if (subheadings.length > 0) {
                    let a = subheadings.map(s => s.classlist.sort((a, b) => a.localeCompare(b)).join(' '))
                    return !a.every((el, i, arr) => el === arr[0])
                }
            }
            return false
        }
    }

    const updateTextStyle = () => {
        if (presentation && presentation.items && presentation.items.length > 0) {
            let _presentation = presentation;
            if (selectedItem.classlist.join(' ').includes('subheading')) {
                let index = selectedItem.classlist.findIndex(el => el.includes('subheading'));
                if (_presentation.items.filter(el => el.classlist.includes(selectedItem.classlist[index])).length > 0) {
                    _presentation.items.filter(el => el.classlist.includes(selectedItem.classlist[index])).forEach(el => el.classlist = selectedItem.classlist);
                }
                loadPresentation(_presentation)
            }
            
        }
    }

    const changeTextSize = (size) => {
        let index = selectedItem.classlist.findIndex(el => el.includes('text-'));
        if (index >= 0) {
            selectedItem.classlist[index] = size;
            loadPresentation(presentation)
        }
    }

    const selectedStyle = () => {
        if (selectedItem) {
            let index = selectedItem.classlist.findIndex(el => el.includes('text-') )
            if (index >= 0) {
               let name = selectedItem.classlist[index]; 
              return textStyles.filter(el => el.id === name)[0].text
           } 
            return 'none'
        }
        return 'none'
    }
 
    return (
        <div>
            <div className="inline-flex items-center">
            <InsDropDown items={textStyles} title="Text Styles">
                <SecondaryButton label={`${selectedStyle()}${shouldUpdate() ? '*' : ''}`} hasDropdown={true} />
            </InsDropDown>
            {
                shouldUpdate() ? <SecondaryButton onClick={updateTextStyle} label={`Update`} hasDropdown={false} /> : null
            }
            </div>
        </div>
    )
}
