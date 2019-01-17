export const ADD_LOT ='ADD_LOT';
export const REMOVE ='REMOVE';
export const CHANGE = 'CHANGE';
export const GET = 'GET';
// export const GET_LOT_BY_ID = 'GET_LOT_BY_ID';
export const CURRENT_LOT = 'CURRENT_LOT';
export const BAN = 'BAN';
export const UNBAN = 'UNBAN';


export function addLot(lot){
    return {
        type: ADD_LOT,
        lot: lot
    }
}

export function rmLot(lot) {
    return{
        type: REMOVE,
        lot: lot
    }
}

export function changeLot(changedLot) {
    return{
        type: CHANGE,
        lot: changedLot
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

export function setCurrentLot(lot) {
    return{
        type: CURRENT_LOT,
        currentLot: lot
    }
}

export function ban(user) {
    return{
        type: BAN,
        banned: user
    }
}

export function unban(user) {
    return{
        type: UNBAN,
        unbanned: user
    }
}



