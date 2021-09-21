import React, { createContext, useReducer } from 'react';
import reducer from './AppReducer';
import localforage from 'localforage';

import {
    CHANGE_WORKSPACE,
    OPEN_DROPDOWN,
    CLOSE_DROPDOWN,
    CHANGE_BREAKPOINT,
    TOGGLE_LEFT_SIDEBAR,
    TOGGLE_RIGHT_SIDEBAR,
    LOAD_PRESENTATION,
    ADD_ASSET,
    ADD_TO_PRESENTATION,
    SELECT_ITEM,
    OPEN_MODAL,
    CLOSE_MODAL,
    TOGGLE_DRAGGING,
    ON_DRAG,
    ON_DROP,
    ON_RESIZE,
    TOGGLE_CONTEXT_MENU,
    SELECT_ASSET,
    SELECT_COMPONENT,
    REMOVE_ITEM
} from './ActionTypes';


const initialState = {
   workspace: 'presentation',
   changeWorkspace: null,
   presentation: null,
   loadPresentation: null,
   isDropdownOpen: null,
   closeDropdown: null,
   addAsset: null,
   isLeftSidebarOpen: true,
   isRightSidebarOpen: true,
   toggleLeftSidebar: null,
   toggleRightSidebar: null,
   changeBreakpoint: null,
   breakpoint: 'desktop',
   openDropdown: null,
   addToPresentation: null,
   selectedItem: null,
   selectItem: null,
   modalChildren: null,
   openModal: null,
   closeModal: null,
   setImageCrop: null,
   setImageBlob: null,
   isModalOpen: false,
   removeItem: null,
   removeClass: null,
   addClass: null,
   addComponent: null,
   toggleDragging: null,
   isDragging: false,
   dragEvent: null,
   dropEvent: null,
   handleOnDrag: null,
   handleOnDrop: null,
   component: null,
   asset: null,
   width: '10%',
   onResizeStop: null,
   selectAsset: null,
   modalPosition: {
       x: null,
       y: null
   },
   selectComponent: null,
   showContextMenu: null,
   toggleContextMenu: false
}



export const GlobalContext = createContext(initialState)

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const changeWorkspace = (workspace) => {
        dispatch({
            type: CHANGE_WORKSPACE,
            payload: {
                isDropdownOpen: null,
                workspace
            }
        })
    }

    const closeDropdown = () => {
        dispatch({
            type: CLOSE_DROPDOWN,
            payload: null
        })
    }

    const openDropdown = (event) => {
        dispatch({
            type: OPEN_DROPDOWN,
            payload: event.currentTarget
        })
    }

    const toggleLeftSidebar = () => {
        dispatch({
            type: TOGGLE_LEFT_SIDEBAR,
            payload: !state.isLeftSidebarOpen
        })
    }

    const showContextMenu = () => {
        dispatch({
            type: TOGGLE_CONTEXT_MENU,
            payload: !state.toggleContextMenu
        })
    }

    const onResizeStop = (width) => {
        dispatch({
            type: ON_RESIZE,
            payload: width
        })
    }

    const toggleRightSidebar = () => {
        dispatch({
            type: TOGGLE_RIGHT_SIDEBAR,
            payload: !state.isRightSidebarOpen
        })
    }

    const changeBreakpoint = (breakpoint) => {
        dispatch({
            type: CHANGE_BREAKPOINT,
            payload: breakpoint
        })
    }

    const loadPresentation = async (presentation) => {
        try {
         
            if (!presentation) {
                const data = {
                    id: "2e38c05f-e466-4536-889b-12d62a8a63a4",
                    name: "presentation",
                    extension: "MEPSP",
                    size: "329KB",
                    date: new Date().toLocaleString(),
                    items: [],
                    assets: [],
                    toc: []
                }
                await localforage.setItem('presentation', data)
                dispatch({
                    type: LOAD_PRESENTATION,
                    payload: data
                })
            } else {
                await localforage.setItem('presentation', presentation)
                dispatch({
                    type: LOAD_PRESENTATION,
                    payload: presentation
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    const toggleDragging = (boolean) => {
        dispatch({
            type: TOGGLE_DRAGGING,
            payload: boolean
        })
    }

    const handleOnDrag = (event) => {
      
        dispatch({
            type: ON_DRAG,
            payload: event
        })
    }

    const handleOnDrop = (event) => {

        dispatch({
            type: ON_DROP,
            payload: event
        })
    }

    const addAsset = async (data) => {

        let _presentation = await localforage.getItem('presentation');
        if (_presentation) {
            _presentation.assets.push(data)
            if (data.extension === 'MEPSA') {
                // TOC Concept
                let filteredTOCArticles = _presentation.toc.filter(article => article.id === data.id);
                if (filteredTOCArticles.length > 0) {
                  return alert("Already exists")
                }
                _presentation.toc.push(data)
            }
           
            dispatch({
                type: ADD_ASSET,
                payload: _presentation
            })
            await localforage.setItem('presentation', _presentation)
        }
    }

    const removeClass = async (item, className, _presentation) => {
        if (_presentation && _presentation.items.length > 0 ) {
            let newClassList = item.classlist.filter(c => c !== className);
            item.classlist = newClassList;
            await localforage.setItem('presentation', _presentation);
            dispatch({
                type: LOAD_PRESENTATION,
                payload: _presentation
            })
        } 
    }

    const addClass = async (item, newClassList, _presentation) => {
        if (_presentation && _presentation.items.length > 0 ) {
            item.classlist = newClassList;
            await localforage.setItem('presentation', _presentation);
            dispatch({
                type: LOAD_PRESENTATION,
                payload: _presentation
            })
        } 
    }


      function array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
    };


    const addToPresentation = async (item, srcIndex, targetIndex) => {

        let _presentation = await localforage.getItem('presentation');

        if (_presentation) {
            if (item.extension && item.extension === 'MEPSA') {

                if (_presentation.items.filter(i => i.id === item.items[0].id).length > 0) {
                  return alert('Already Exists')
                } 

                if (_presentation.items.length > 0) {
                    _presentation.items = [
                        ..._presentation.items,
                        ...item.items
                    ]
                } else {
                    _presentation.items = [
                        ...item.items
                    ]
                }
                
            } else {
                
                    if (srcIndex !== null && targetIndex !== null) {
                        array_move(_presentation.items, srcIndex, targetIndex)
                    } else if (srcIndex !== null) {
                        _presentation.items[srcIndex] = item
                    } else if (targetIndex !== null) {
                        _presentation.items.splice(targetIndex, 0, item)
                    }  else {
                        
                        _presentation.items.push(item)
                    }
                }
            
              
                await localforage.setItem('presentation', _presentation)
                dispatch({
                    type: ADD_TO_PRESENTATION,
                    payload: _presentation
                })

        } 
    }

    const addComponent = async (component, _presentation) => {

            if (_presentation) {

                if (_presentation.items.length > 0 && state.selectedItem) {
                    let selectedIndex = _presentation.items.findIndex(el => el.id === state.selectedItem.id); 
                    switch (component.type) {
                        case "columns":
                            component.children[0].children.push(state.selectedItem)
                            _presentation.items[selectedIndex] = component
                            break;
                        case "imageBox":
                            _presentation.items.splice(selectedIndex + 1, 0, component)
                            break;
                        case "textbox":
                            _presentation.items.splice(selectedIndex + 1, 0, component)
                            break;
                        default:
                            break;
                    }
                    
                } else {
                    _presentation.items.unshift(component)
                }
                    await localforage.setItem('presentation', _presentation)
                    dispatch({
                        type: LOAD_PRESENTATION,
                        payload: _presentation
                    })
            }
       
    }


    const removeItem = async (item, _presentation) => {

        if (_presentation && _presentation.items.length > 0) {
           
            if (item.type === 'columns') {
               
                let index = _presentation.items.findIndex(el => el.id === item.id);
                if (item.children[0].children.length > 0 && item.children[0].children.length > 0) {
                    _presentation.items.splice(index, 0, ...item.children[0].children, ...item.children[1].children)
                } else if (item.children[0].children.length > 0) {
                    _presentation.items.splice(index, 0, ...item.children[0].children)
                } else if (item.children[1].children.length > 0) {
                    _presentation.items.splice(index, 0, ...item.children[1].children)
                }
            }

            _presentation.items = _presentation.items.filter(el => el.id !== item.id)
            await localforage.setItem('presentation', _presentation)
            dispatch({
                type: REMOVE_ITEM,
                payload: _presentation
            })
        }
        
    }

    const openModal = (children, x, y) => {
        let _modalPosition = { x, y }
        dispatch({
            type: OPEN_MODAL,
            payload: {
                isModalOpen: true,
                modalPosition: _modalPosition,
                modalChildren: children,
            }
        })
    }

    const closeModal = () => {
        dispatch({
            type: CLOSE_MODAL,
            payload: {
                isModalOpen: false,
                modalChildren: null,
            }
        })
    }


    const setImageCrop = async (item, crop, cropId, _presentation) => {
      
       // let _presentation = await localforage.getItem('presentation');
        if (_presentation && _presentation.items.length > 0) {

            let imageItems = _presentation.items.filter(_item => _item.id === item.id);
            if (imageItems.length > 0) {
                let imageItem = imageItems[0];
                let crops = imageItem.crops.filter(c => c.id === cropId);
                if (crops.length > 0) {
                    let imageCrop = {
                        ...crops[0],
                        x: crop.x,
                        y: crop.y
                    }
                    let imageCropIndex = imageItem.crops.findIndex(el => el.id === cropId);
                    let itemIndex = _presentation.items.findIndex(el => el.id === item.id);

                    imageItem.crops[imageCropIndex] = imageCrop;
                    _presentation.items[itemIndex] = imageItem;
                    await localforage.setItem('presentation', _presentation);

                    dispatch({
                        type: LOAD_PRESENTATION,
                        payload: _presentation
                    })
                }
            }
            
        }
    }

    const setImageBlob = async (item, blob, cropId, cropName) => {
        let _presentation = await localforage.getItem('presentation');
    
        if (_presentation && _presentation.items.length > 0) {
            let imageItems = _presentation.items.filter(_item => _item.id === item.id);
            if (imageItems.length > 0) {
                let imageItem = imageItems[0];
                let crops = imageItem.crops.filter(c => c.id === cropId);
                if (crops.length > 0) {
                    let imageCropIndex = imageItem.crops.findIndex(el => el.id === cropId);
                    let itemIndex = _presentation.items.findIndex(el => el.id === item.id);
                    imageItem.blob = blob;
                    imageItem.crop = cropName;
                    imageItem.classlist.forEach((classKey, index) => {
                        if (classKey.includes('img')) {
                            imageItem.classlist.splice(index, 1);
                        }
                    })
                    
                    imageItem.classlist.push(`img_${imageItem.crops[imageCropIndex].name.toLowerCase()}`)  

                    imageItem.crops[imageCropIndex] = {
                        ...imageItem.crops[imageCropIndex],
                        blob: blob
                    }
                    _presentation.items[itemIndex] = imageItem;
                    await localforage.setItem('presentation', _presentation);

                    dispatch({
                        type: LOAD_PRESENTATION,
                        payload: _presentation
                    })

                    dispatch({
                        type: SELECT_ITEM,
                        payload: imageItem
                    })
                }
            }
            
        }
    }

    const selectItem = (item) => {
        
        if (item) {
            dispatch({
                type: SELECT_ITEM,
                payload: item
            })
        }
    }

    const selectComponent = (component) => {
        if (component) {
            dispatch({
                type: SELECT_COMPONENT,
                payload: component
            })
        }
    }

    const selectAsset = (asset) => {
       
        if (asset) {
            dispatch({
                type: SELECT_ASSET,
                payload: asset
            })
        }
    }


    return (
        <GlobalContext.Provider value={{
           workspace: state.workspace,
           breakpoint: state.breakpoint,
           presentation: state.presentation,
           isDropdownOpen: state.isDropdownOpen,
           isLeftSidebarOpen: state.isLeftSidebarOpen,
           isRightSidebarOpen: state.isRightSidebarOpen,
           loadPresentation,
           setImageCrop,
           addAsset,
           openDropdown,
           changeBreakpoint,
           closeDropdown,
           toggleRightSidebar,
           toggleLeftSidebar,
           changeWorkspace,
           openModal,
           setImageBlob,
           addToPresentation,
           isModalOpen: state.isModalOpen,
           showContextMenu,
           toggleContextMenu: state.toggleContextMenu,
           selectItem,
           closeModal,
           removeItem,
           modalChildren: state.modalChildren,
           selectedItem: state.selectedItem,
           modalPosition: state.modalPosition,
           removeClass,
           addClass,
           addComponent,
           toggleDragging,
           components: state.components,
           isDragging: state.isDragging,
           handleOnDrop,
           handleOnDrag,
           onResizeStop,
           dragEvent: state.dragEvent,
           dropEvent: state.dropEvent,
           selectComponent,
           selectAsset,
           component: state.component,
           asset: state.asset,
           width: state.width
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
