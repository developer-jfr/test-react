import { SET_FAVORITES, EDIT_MODE_FAVORITES, DELETE_ALL } from "./../actionType";
const initialState = {
  fav: [],
};

export const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVORITES: {
      return {
        ...state,
        fav: [...state.fav, action.payload],
      };
    }
    case EDIT_MODE_FAVORITES: {
      const updateItem = action.payload;

      const updateItems = state.fav.map((item) => {
        if (item.id === updateItem.id) {
          return updateItem;
        }
        return item;
      });
      return {
        fav: updateItems,
      };
    }
   
    default:
      return state;
  }
};

{
  /**
 return state.fav.map((item) => {
        if (item.id === action.payload.fav.id) {
          return {
            ...state,
            fav: state.fav[action.payload.fav],
          };
        }
        return item;
      });
*/
}
