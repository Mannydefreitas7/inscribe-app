import * as actionTypes from "./ActionTypes";


const reducer = (
   state,
   action
) => {
   switch(action.type) {
      case actionTypes.LOAD_PRESENTATION:
      return {
         ...state,
         presentation: action.payload
      };

      case actionTypes.REMOVE_ITEM:
      return {
         ...state,
         selectedItem: null,
         component: null,
         presentation: action.payload
      };
      case actionTypes.ON_RESIZE:
         return {
            ...state,
            width: action.payload
         }
      case actionTypes.ADD_ASSET:
      return {
         ...state,
         presentation: action.payload
      };

      case actionTypes.ADD_TO_PRESENTATION:
         return {
            ...state,
            presentation: action.payload
         };
     
      case actionTypes.CHANGE_WORKSPACE:
      return {
         ...state,
         workspace: action.payload.workspace,
         isDropdownOpen: action.payload.isDropdownOpen
      };
      case actionTypes.CHANGE_BREAKPOINT:
      return {
         ...state,
         breakpoint: action.payload
      };
      case actionTypes.TOGGLE_CONTEXT_MENU:
         return {
            ...state,
            toggleContextMenu: action.payload
         };
      case actionTypes.OPEN_DROPDOWN:
      return {
         ...state,
         isDropdownOpen: action.payload
      };
      case actionTypes.CLOSE_DROPDOWN:
      return {
         ...state,
         isDropdownOpen: action.payload
      };
      case actionTypes.TOGGLE_LEFT_SIDEBAR:
      return {
         ...state,
         isLeftSidebarOpen: action.payload
      };
      case actionTypes.TOGGLE_RIGHT_SIDEBAR:
      return {
         ...state,
         isRightSidebarOpen: action.payload
      };
      case actionTypes.OPEN_MODAL:
      return {
         ...state,
         isModalOpen: action.payload.isModalOpen,
         modalPosition: action.payload.modalPosition,
         modalChildren: action.payload.modalChildren
      };
      case actionTypes.CLOSE_MODAL:
      return {
         ...state,
         isModalOpen: action.payload.isModalOpen,
         modalChildren: action.payload.modalChildren
      };
      case actionTypes.SELECT_ITEM:
      return {
         ...state,
         selectedItem: action.payload
      };
      case actionTypes.SELECT_ASSET:
      return {
         ...state,
         asset: action.payload
      };
      case actionTypes.SELECT_COMPONENT:
      return {
         ...state,
         component: action.payload
      };
      case actionTypes.TOGGLE_DRAGGING:
      return {
         ...state,
         isDragging: action.payload
      };
      case actionTypes.ON_DRAG:
      return {
         ...state,
         dragEvent: action.payload
      };
      case actionTypes.ON_DROP:
      return {
         ...state,
         dropEvent: action.payload
      };
      default:
         return state
   }
}

export default reducer;
