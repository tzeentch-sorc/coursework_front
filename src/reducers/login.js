import {LOGIN, LOGOUT} from "../actions/login";

export default function loginReducer(state = {isAuthorised: false}, action) {
    switch (action.type) {
        case LOGIN:
            return {
                isAuthorised: true
            };
        case LOGOUT:
            return {
                isAuthorised: false
            };
        default: return state;
    }
}