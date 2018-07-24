// Register User
import { GET_ERRORS } from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
}


export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            //save to local storage 
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);

            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

//set logged in used
export const setCurrentUser = decoded => {
    return {
        type:SET_CURRENT_USER,
        payload:decoded
    }
}