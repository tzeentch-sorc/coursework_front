import {BAN, SET_BANNED, SET_USERS, UNBAN} from "../actions/listAction";

export default function userListReducer(state = {users:[], banned:[]}, action) {
    let filtered;
    switch (action.type) {
        case BAN:
             //alert(JSON.stringify(state.users));
             filtered = state.users.filter((elem) => {
                return JSON.stringify(elem) !== JSON.stringify(action.banned);
            });
            //alert(JSON.stringify(filtered));
            return {
                users: filtered,
                banned: [...state.banned, action.banned]
            };
        case UNBAN:
            filtered = state.banned.filter((elem) => {
                return elem !== action.unbanned;
            });
            return {
                users: [...state.users, action.unbanned],
                banned: filtered
            };
        case SET_USERS:
            return{
                users: action.users,
                banned: state.banned
            };
        case SET_BANNED:
            return{
                users: state.users,
                banned : action.banned
            };
        default: return state;
    }
}