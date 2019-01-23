import {ADD_LOT, CHANGE, SET_LIST, REMOVE} from "../actions/listAction";

export default function lotListReducer(state = {items:[]}, action) {
    let position;
    let upd;
    switch (action.type) {
        case ADD_LOT:
            return {
                items: [...action.lot]
            };
        case CHANGE:
            position = state.items.findIndex((obj =>
                obj.id === action.lot.id
            ));

            state.items[position] = action.lot;
            return{
                items: state.items
            };
        case REMOVE:
            upd = state.items.filter((obj => {
                    return obj.id !== action.lot.id;
                }
            ));
            return {
              items: upd
            };
        case SET_LIST:
            return {
                items: action.lots
            };
        default: return state;
    }
}
