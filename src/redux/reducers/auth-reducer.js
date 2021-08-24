

const initialState = {
    user: [] ,
    token: ''
}

 const authReducer = (state = initialState, action) => {
   switch(action.type) {
       case 'SGN/AC/СREATE_USER': {
           return {
               ...state,
               user: action.payload.user
           }
       }
       case 'SGN/AC/SIGN_IN_USER': {
           return {
               ...state,
               token: action.payload.token
           }
       }
       default: return state
   }
}



export default authReducer
