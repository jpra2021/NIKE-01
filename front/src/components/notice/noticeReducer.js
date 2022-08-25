import Notice from "./Notice"

const reducer = (state, action) => {
    const { title, message } = action.payload;
    const type = action.type;

    const newState = [ ...state, {title, message, type}];
    
    return newState
}

export default reducer;