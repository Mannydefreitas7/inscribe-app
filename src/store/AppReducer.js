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

      case actionTypes.ADD_ASSET:
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
      default:
         return state
   }
}

export default reducer;
