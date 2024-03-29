import React, { useContext } from 'react'
import { GlobalContext } from '../../store/GlobalState'

function ColorPickerButton(props) {

    const { selectedItem } = useContext(GlobalContext)

    let hasColor = selectedItem && selectedItem.classlist && selectedItem.classlist.join(' ').includes('color');

    let colorClassIndex = selectedItem  && selectedItem.classlist && selectedItem.classlist.findIndex(item => item.includes('color'));

    let colorName = selectedItem  && selectedItem.classlist && selectedItem.classlist[colorClassIndex] && selectedItem.classlist[colorClassIndex].split('-').join(' ').replace('color', '');
    

    return (
        <>
            <button 
            {...props}
            disabled={!selectedItem}
            className="flex items-center">
                <span className={`text-sm py-1 px-2 rounded mr-1 bg-gray-100 ${selectedItem ? 'text-gray-600' : 'text-gray-200'}`}>{selectedItem && hasColor ? colorName : 'Black'}</span>
                <div className={`rounded-sm border border-gray-200 ${hasColor ? 'background-' + selectedItem.classlist[colorClassIndex] : 'bg-black'} ${!selectedItem ? 'bg-opacity-20' : 'bg-opacity-100'}`} style={{ height: 25, width: 25 }}></div>
            </button>
        </>
        
    )
}

export default ColorPickerButton
