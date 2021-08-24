import { authAPI } from './../../api';




export const actions = {
    signUpUserAC: (user) => ({type: 'SGN/AC/СREATE_USER', payload: {user}} ),
    signInUserAC: (token) => ({type: 'SGN/AC/SIGN_IN_USER', payload: {token} } )
}


export const signUpUserThunk = (user) => {
    return async (dispatch) => {
    let response = await authAPI.signUp(user.username, user.email, user.password)
    dispatch(actions.signUpUserAC(response.data))
    }
}

export const signInUserThunk = (loginUser) => {
    return async (dispatch) => {
        let response = await authAPI.login(loginUser.username, loginUser.password)
        dispatch(actions.signInUserAC(response.data.token))
        localStorage.setItem('token', response.data.token)

    }
}



