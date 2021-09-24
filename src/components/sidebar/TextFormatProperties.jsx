import React, { useContext } from 'react'
import { GlobalContext } from '../../store/GlobalState';
import Togglebuttons from '../buttons/Togglebuttons';
import { ReactComponent as BoldIcon } from './../../assets/icons/bold.svg';
import { ReactComponent as BoldIconWhite } from './../../assets/icons/bold-white.svg';
import { ReactComponent as ItalicIcon } from './../../assets/icons/italic.svg';
import { ReactComponent as ItalicIconWhite } from './../../assets/icons/italic-white.svg';
import { ReactComponent as UnderlineIcon } from './../../assets/icons/underline.svg';
import { ReactComponent as UnderlineIconWhite } from './../../assets/icons/underline-white.svg';


export default function TextFormatProperties() {
    const { selectedItem, presentation, loadPresentation } = useContext(GlobalContext)

    const toggleFormatClass = (classname) => {
        if (selectedItem) {
            let currentIndex = selectedItem.classlist.findIndex(el => el === classname);
                if (currentIndex >= 0) {
                    selectedItem.classlist = selectedItem.classlist.filter(el => el !== classname);
                } else {
                    selectedItem.classlist.push(classname)
                }
               loadPresentation(presentation)
        }
    }


    return (
        <>
            <Togglebuttons 
                selection={{id: selectedItem.classlist}}
                items={[
                    {
                        icon: selectedItem.classlist.includes('font-bold') ? <BoldIconWhite height={15} /> : <BoldIcon height={15} />,
                        id: 'font-bold',
                        onClick: () => { toggleFormatClass('font-bold') }
                    },
                    {
                        name: selectedItem.classlist.includes('font-italic') ? <ItalicIconWhite height={15} /> :  <ItalicIcon height={15} />,
                        id: 'font-italic',
                        onClick: () => { toggleFormatClass('font-italic') }
                    },
                    {
                        name: selectedItem.classlist.includes('font-underline') ? <UnderlineIconWhite height={15} /> : <UnderlineIcon height={15} />,
                        id: 'font-underline',
                        onClick: () => { toggleFormatClass('font-underline') }
                    },
                    
                ]} />
        </>
    )
}
