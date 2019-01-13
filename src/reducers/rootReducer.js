import currentLotReducer from "./lot";
import loginReducer from "./login";
import {combineReducers} from "redux";
import lotListReducer from "./lotList";

export default combineReducers({
    loginReducer,
    currentLotReducer,
    lotListReducer
});