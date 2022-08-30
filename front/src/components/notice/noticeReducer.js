const reducer = (state, action) => {
    const { title, message } = action.payload;
    const type = action.type;
    console.log("설마? 혹시?")
    const newState = [ ...state, {title, message, type}];
    
    return newState
}

export default reducer;