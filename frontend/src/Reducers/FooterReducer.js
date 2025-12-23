const initialState = {
    footer : true
}

const footerReducer=(state=initialState,action)=>{
    switch (action.type){
        case "HIDE_FOOTER":
            return {
                ...state,
                footer : false
            }
        case "SHOW_FOOTER":
            return {
                ...state,
                footer : true
            }
        default:
            return state
    }
}

export default footerReducer;