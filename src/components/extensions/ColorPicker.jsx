import React, { useContext, useState } from 'react';
import Collaspible from '../Collaspible';
import HeaderTitle from './../modal/HeaderTitle';
import colors from '../../assets/json/colors.json';
import tokens from '../../assets/json/tokens.json';
import _ from "lodash";
import { GlobalContext } from '../../store/GlobalState';
function ColorButton({ value, name, color }) {

    const { selectedItem, addClass, closeModal } = useContext(GlobalContext)

    return (
        <button 
            onClick={() => {
                if (selectedItem && selectedItem.classlist) {
                    
                    let hasColor = selectedItem && selectedItem.classlist && selectedItem.classlist.join(' ').includes('color');

                    let colorClassIndex = selectedItem && selectedItem.classlist && selectedItem.classlist.findIndex(item => item.includes('color'));
                    
                    var classList;

                    if (color) {
                    // It means @color is part of
                    // the extended palette.
                    // So in that case, we add the 
                    // shade/tint value.
                        if (hasColor) {
                            // check if current item
                            // already has a color value.
                            selectedItem.classlist[colorClassIndex] = `color-${color}-${name}`
                        } else {
                            selectedItem.classlist.push(`color-${color}-${name}`)
                        }
                    } else {
                        if (hasColor) {
                            // check if current item
                            // already has a color value.
                            selectedItem.classlist[colorClassIndex] = `color-${name.toLowerCase()}`
                        } else {
                            selectedItem.classlist.push(`color-${name.toLowerCase()}`)
                        }
                    }

                    classList = selectedItem.classlist;
                    
                    addClass(selectedItem, classList);
                    closeModal()
                }
                
            }}
            className="px-3 py-1 text-left text-sm border border-gray-200 font-semibold"
            style={{ backgroundColor: value, color: name === 'Black' || Number(name) > 400 ? 'white' : 'black' }}
        >{name}</button>
    )
}

function ColorPicker() {

    const filteredTokens = tokens.entities.filter(color => {
        return color.type === 'color'
    })

    const [search, setSearch] = useState('');

    const newTokens = filteredTokens.map(token => {
        return {
            name: token.name.split(' ')[0],
            color: token.name,
            number: token.name.split(' ').length > 2 ? Number(token.name.split(' ')[2]) : Number(token.name.split(' ')[1]),
            value: token.value
        }
    })

   const groups = _.groupBy(newTokens, 'name')
    return (
        <div>
           
            <HeaderTitle title="Color Palette" />
            
            <div className="px-4 pt-4">
                <input className="px-2 w-full rounded py-1 border border-gray-300 appearance-none focus:outline-none focus:border-indigo-800" type="text" 
                 placeholder="Search Colors"onInput={e => setSearch(e.target.value)} />
            </div>
            <div className="overflow-scroll" style={{ maxHeight: 500 }}>
            <div className="grid grid-cols-2 gap-2 px-4 py-2">
                <ColorButton name={'Black'} value={colors.color.BLACK.value} />
                <ColorButton name={'White'} value={colors.color.WHITE.value} />
            </div>
                {
                  groups && Object.keys(groups).filter(item => item.toLowerCase().includes(search.toLowerCase())).map((array, key) => {
                      return <div key={key}>
                        <div className="px-4 pt-2 pb-1 font-medium text-sm">{array}</div>
                        <div className="grid grid-cols-5 gap-1 px-4">
                            {
                                groups && groups[array].sort((a,b) => a.number - b.number).map((color, i) => {
                                  return  <ColorButton
                                    color={array.toLowerCase()}
                                   key={i} name={color.number} value={color.value} />
                                })
                            }
                        </div>
                      </div>
                  })
                }
            </div>
        </div>
    )
}

export default ColorPicker
