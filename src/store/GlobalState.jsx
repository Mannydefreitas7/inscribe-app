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
    CLOSE_MODAL
} from './ActionTypes';


const initialState = {
   workspace: 'presentation',
   changeWorkspace: null,
   presentation: null,
   loadPresentation: null,
   isDropdownOpen: null,
   closeDropdown: null,
   addAsset: null,
   isLeftSidebarOpen: false,
   isRightSidebarOpen: false,
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
   isModalOpen: false
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
                    assets: []
                }
                await localforage.setItem('presentation', data)
                dispatch({
                    type: LOAD_PRESENTATION,
                    payload: data
                })
            } else {
                console.log(presentation)
                dispatch({
                    type: LOAD_PRESENTATION,
                    payload: presentation
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    const addAsset = async (data) => {

        let _presentation = await localforage.getItem('presentation');
        if (_presentation) {
            _presentation.assets.push(data)
            await localforage.setItem('presentation', _presentation)
        }
        dispatch({
            type: ADD_ASSET,
            payload: _presentation
        })
    }


    const addToPresentation = async (items) => {

        let _presentation = await localforage.getItem('presentation');
        if (_presentation) {
            _presentation.items = [
                ...items
            ]
            await localforage.setItem('presentation', _presentation)
        }
        dispatch({
            type: ADD_TO_PRESENTATION,
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

    const closeModal = (children) => {
        dispatch({
            type: CLOSE_MODAL,
            payload: {
                isModalOpen: false,
                modalChildren: null,
            }
        })
    }

    const selectItem = (item) => {
        dispatch({
            type: SELECT_ITEM,
            payload: item
        })
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
           addAsset,
           openDropdown,
           changeBreakpoint,
           closeDropdown,
           toggleRightSidebar,
           toggleLeftSidebar,
           changeWorkspace,
           openModal,
           addToPresentation,
           isModalOpen: state.isModalOpen,
           selectItem,
           closeModal,
           modalChildren: state.modalChildren,
           selectedItem: state.selectedItem
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
