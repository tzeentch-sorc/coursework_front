import {BAN, UNBAN} from "../actions/listAction";

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
        default: return state;
    }
}