export const LOGIN ='LOGIN';
export const LOGOUT ='LOGOUT';
export function setAuthorised() {
    return{
        type: LOGIN,
        isAuthorised: true
    }
}

export function setUnAuth() {
    return{
        type: LOGOUT,
        isAuthorised: false
    }
}