import {CURRENT_LOT} from "../actions/listAction";

export default function currentLotReducer(state = {currentLot: -1}, action) {
    switch (action.type) {
        case CURRENT_LOT:
            return {
                currentLot: action.currentLot
            };
        default: return state;
    }
}