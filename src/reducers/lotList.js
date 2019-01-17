import {ADD_LOT, CHANGE, GET} from "../actions/listAction";

export default function lotListReducer(state = {items:[]}, action) {
    let changedPos;
    switch (action.type) {
        case ADD_LOT:
            return {
                items: [...action.lot]
            };
        case CHANGE:
            changedPos = state.items.findIndex((obj =>
                obj.id === action.lot.id
            ));
            state.items[changedPos] = action.lot;
            return{
                items: state.items
            };
        case GET:
            return {
                items: []
            };
        default: return state;
    }
}
