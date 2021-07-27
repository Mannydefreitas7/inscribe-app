import React from 'react'
import { useContext } from 'react';
import { GlobalContext } from '../store/GlobalState';
import Collaspible from './Collaspible';
import Component from './Component';


export default function Components() {

    const { components, addComponent, closeModal } = useContext(GlobalContext)

    return (
        <Collaspible title="Components">
            <div className="grid grid-cols-3 gap-1">
                {
                    components && components.map(component => {
                        return <Component 
                        key={component.id}
                        component={component} 
                        onClick={() => {
                            addComponent(component)
                            closeModal()
                        }}/>
                    })
                }
            </div>
        </Collaspible>
    )
}
