import {LOGIN, LOGOUT, REG_FAIL, REG_SUCCESS} from "../actions/login";
export default function loginReducer(state = {isAuthorised: false}, action) {
    switch (action.type) {
        case LOGIN:
            return {
                isAuthorised: true,
                role: action.role
            };
        case LOGOUT:
            return {
                isAuthorised: false
            };
        case REG_SUCCESS:
            return{
                regResult: true
            };
        case REG_FAIL:
            return{
                regResult: false
            };
        default: return state;
    }
}
