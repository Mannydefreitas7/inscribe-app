import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../store/GlobalState';
import { Resizable } from 're-resizable';
export default function ColumnsResize() {

    const { component, loadPresentation, presentation, onResizeStop, width } = useContext(GlobalContext);

  

    useEffect(() => {
        onResizeStop(component.children[0].properties.width)
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onResize = (event, direction, el, delta) => {
        let value = Number(el.style.width.replace('%', ''))
        let className = ''
         if (value >= 70) {
             className = 'SevenEight'
             onResizeStop('86%')
         } else if (value >= 60 && value < 70) {
             className = 'SixEight'
             onResizeStop('74%')
         } else if (value > 50 && value < 60) {
             className = 'FiveEight'
             onResizeStop('61%')
         } else if (value > 40 && value <= 50) {
             className = 'Half'
             onResizeStop('49.5%')
         } else if (value > 30 && value < 40) {
             className = 'ThreeEight'
             onResizeStop('36%')
         } else if (value > 20 && value < 30) {
             className = 'TwoEight'
             onResizeStop('24%')
         } else {
             className = 'OneEight'
             onResizeStop('12%')
         }
         if (component.children.length > 0) {
            component.children[0].properties.width = el.style.width
            component.children[0].description = className
         }

         let index = presentation.items.findIndex(el => el.id === component.id);
         presentation.items[index] = component
         
         loadPresentation(presentation)
     }

    return (
        <div className="flex relativew w-full">
            <Resizable
                bounds={'parent'}
                onResizeStop={onResize}
                size={{
                    width: width,
                    height: 'auto',
                }}
                minHeight={40}
                className={`bg-gray-100 mr-2 rounded`}
                enable={{ right: true }}
                handleComponent={{ right: <div className="bg-indigo-600 h-full shadow-sm rounded-full  absolute transform -translate-y-1/2 top-1/2 z-40" style={{ width: 5, right: -5 }}></div>}}>
                    <div></div>
                </Resizable>
                <div className="w-full bg-gray-100 rounded ml-2"></div>
        </div>
    )
}
