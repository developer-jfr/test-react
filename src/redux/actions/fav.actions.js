import {SET_FAVORITES, EDIT_MODE_FAVORITES, DELETE_ALL} from './../actionType'
export const setFavoritesAC = (fav) => ({type: SET_FAVORITES, payload: fav});
export const editModeFavoritesAC = (fav) => ({type: EDIT_MODE_FAVORITES, payload: fav})
