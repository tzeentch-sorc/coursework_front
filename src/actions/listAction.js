export const ADD ='ADD';
export const REMOVE ='REMOVE';
export const SORT = 'SORT';
export const GET = 'GET';


export function addPict(picture){
    return {
        type: ADD,
        newPict: picture
    }
}

export function rmPict(pictID) {
    return{
        type: REMOVE,
        rmID: pictID
    }
}

export function sortList(filterType) {
    return{
        type: SORT,
        filter: filterType
    }
}

export function getList() {
    return{
        type: GET
    }
}