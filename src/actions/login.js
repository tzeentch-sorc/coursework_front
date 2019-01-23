export const LOGIN ='LOGIN';
export const LOGOUT ='LOGOUT';
export const AUTH_FAIL = 'AUTH_FAIL';
export const REG_FAIL = 'REG_FAIL';
export const REG_SUCCESS= 'REG_SUCCESS';

export function setAuthorised(role) {
    return{
        type: LOGIN,
        isAuthorised: true,
        role: role
    }
}

export function setUnAuth() {
    return{
        type: LOGOUT,
        isAuthorised: false
    }
}

export function authResult() {
    return{
        type: AUTH_FAIL,
        isAuthorised: false
    }
}

export function registryFail() {
    return{
        type: REG_FAIL,
        regResult: false
    }
}

export function registrySuccess() {
    return{
        type: REG_SUCCESS,
        regResult: true
    }
}

