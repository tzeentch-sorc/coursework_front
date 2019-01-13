import {ADD_LOT, GET, GET_LOT_BY_ID} from "../actions/listAction";

export default function lotListReducer(state = {items:[]}, action) {
    switch (action.type) {
        case ADD_LOT:
            return {
                items: [...action.lot]
            };
        case GET:
            return {
                items: []
            };
        default: return state;
    }
}
