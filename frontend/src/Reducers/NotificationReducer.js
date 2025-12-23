const initialState = {
    showNotification : false
}

export default function showNotification(state = initialState , action){
    switch (action.type){
        case "SHOW" : 
        return {
            ...state ,
            showNotification : true
        }
        case "HIDE" : 
        return {
            ...state ,
            showNotification : false
        }
        default : 
        return state
    }
}