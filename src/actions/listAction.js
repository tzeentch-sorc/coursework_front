export const ADD_LOT ='ADD_LOT';
export const REMOVE ='REMOVE';
export const GET = 'GET';
// export const GET_LOT_BY_ID = 'GET_LOT_BY_ID';
export const CURRENT_LOT = 'CURRENT_LOT';


export function addLot(lot){
    return {
        type: ADD_LOT,
        lot: lot
    }
}

export function rmLot(lotID) {
    return{
        type: REMOVE,
        lotID: lotID
    }
}

export function getList() {
    return{
        type: GET
    }
}

// export function getLotById(lotID) {
//     return(dispatch, getState)=>{
//         const{
//             lot
//         } = getState().lotListReducer.items.forEach(function(item, index, array) {
//             if(lotID === item.id)
//                 return item
//         });
//
//         dispatch({
//             type: GET_LOT_BY_ID,
//             lot: lot
//         })
//
//     }
// }

export function setCurrentLot(lotID) {
    return{
        type: CURRENT_LOT,
        currentLot: lotID
    }
}

