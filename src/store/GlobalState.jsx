import React, { createContext, useReducer } from 'react';
import reducer from './AppReducer';
import localforage from 'localforage';
import useQuery from '../utils/useQuery';
import { v4 } from 'uuid';
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
    SELECT_ASSET,
    SELECT_COMPONENT
} from './ActionTypes';

const components = [
    {
        id: v4(),
        classlist: ["columns"],
        data: "images/columns.jpg",
        date: new Date().toDateString(),
        name: "Columns",
        description: 'Columns',
        type: 'columns',
        children: [
            {
                id: v4(),
                index: 0,
                name: "Column One",
                description: "Column One",
                classlist: ["oneHalf"],
                type: 'column',
                children: []
            },
            {
                id: v4(),
                index: 1,
                name: "Column Two",
                description: "Column Two",
                classlist: ["oneHalf"],
                type: 'column',
                children: []
            }
        ]
    },
    {
        id: v4(),
        classlist: ["backgroundContainer"],
        data: "images/background.jpg",
        date: new Date().toDateString(),
        name: "Background",
        description: 'Background',
        type: 'background',
        children: [
            {
                id: v4(),
                index: 0,
                name: "Background Image",
                description: "Background Image",
                classlist: ["backgroundItem"],
                data: null,
                type: 'image'
            },
            {
                id: v4(),
                index: 1,
                name: "Foreground",
                description: "Foreground items",
                classlist: ["foreground"],
                type: 'container',
                children: []
            }
        ]
    },
    {
        id: v4(),
        classlist: ["boxContainer"],
        data: "images/box.jpg",
        date: new Date().toDateString(),
        name: "Box",
        description: 'Box',
        type: 'box',
        title: null,
        children: []
    },
    {
        id: v4(),
        classlist: ["boxContainer"],
        data: "images/box.jpg",
        date: new Date().toDateString(),
        name: "Box",
        description: 'Box',
        type: 'box',
        title: null,
        children: []
    }
]
 

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
   addComponent: null,
   toggleDragging: null,
   components: components,
   isDragging: false,
   dragEvent: null,
   dropEvent: null,
   handleOnDrag: null,
   handleOnDrop: null,
   component: null,
   asset: null,
   selectAsset: null,
   selectComponent: null
}



export const GlobalContext = createContext(initialState)

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    let query = useQuery();

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

    const loadPresentation = async () => {
        try {
            let presentation = await localforage.getItem('presentation');
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
        console.log(event)
        console.log(state.selectedItem)
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
            await localforage.setItem('presentation', _presentation)
        }
        dispatch({
            type: ADD_ASSET,
            payload: _presentation
        })
    }

    const removeClass = async (item, className) => {
        let _presentation = await localforage.getItem('presentation');
        let articleId = query.get('articleId');

        if (_presentation && articleId && _presentation.toc.filter(article => article.id === articleId).length > 0 ) {

            let itemIndex = _presentation.toc.filter(article => article.id === articleId)[0].items.findIndex(el => el.id === item.id);
            let newClassList = item.classlist.filter(c => c !== className);
            item.classlist = newClassList;
            _presentation.toc.filter(article => article.id === articleId)[0].items[itemIndex] = item;
            await localforage.setItem('presentation', _presentation);
            dispatch({
                type: LOAD_PRESENTATION,
                payload: _presentation
            })

        } 

    }


    const addToPresentation = async (item, index) => {

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
                if (index) {
                    _presentation.items.splice(index, 0, item)
                } else if (index === 0) {
                    _presentation.items.unshift(item)
                } else {
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

    const addComponent = async (component) => {

        let _presentation = await localforage.getItem('presentation');

       
            if (_presentation) {

                if (_presentation.items.length > 0 && state.selectedItem && state.selectedItem.id !== 'placeholder') {
                    let selectedIndex = _presentation.items.findIndex(el => el.id === state.selectedItem.id);  
                    if (component.type === "columns") {
                        component.children[0].children.push(state.selectedItem)
                    }
                    _presentation.items.splice(selectedIndex, 0, component)
                    _presentation.items = [
                        ..._presentation.items.filter(item => item.id !== state.selectedItem.id)
                    ]
                } else {
                    _presentation.items.splice(0, 0, component)
                }
                    await localforage.setItem('presentation', _presentation)
                    dispatch({
                        type: LOAD_PRESENTATION,
                        payload: _presentation
                    })
            }
       
    }


    const removeItem = async (item) => {
        
        let _presentation = await localforage.getItem('presentation')
       
        if (_presentation && _presentation.items.length > 0) {
            _presentation.items = [
                ..._presentation.items.filter(el => el.id !== item.id)
            ]
            await localforage.setItem('presentation', _presentation)
        }
        dispatch({
            type: LOAD_PRESENTATION,
            payload: _presentation
        })
    }

    const openModal = (children) => {
        dispatch({
            type: OPEN_MODAL,
            payload: {
                isModalOpen: true,
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


    const setImageCrop = async (item, crop, cropId) => {
        let _presentation = await localforage.getItem('presentation');
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

                    dispatch({
                        type: SELECT_ITEM,
                        payload: imageItem
                    })
                }
            }
            
        }
    }

    const setImageBlob = async (item, blob, cropId) => {
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
        console.log(component)
        if (component) {
            dispatch({
                type: SELECT_COMPONENT,
                payload: component
            })
        }
    }

    const selectAsset = (asset) => {
        console.log(asset)
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
           selectItem,
           closeModal,
           removeItem,
           modalChildren: state.modalChildren,
           selectedItem: state.selectedItem,
           removeClass,
           addComponent,
           toggleDragging,
           components: state.components,
           isDragging: state.isDragging,
           handleOnDrop,
           handleOnDrag,
           dragEvent: state.dragEvent,
           dropEvent: state.dropEvent,
           selectComponent,
           selectAsset,
           component: state.component,
           asset: state.asset
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
