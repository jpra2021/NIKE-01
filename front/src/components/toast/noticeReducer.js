import Notice from "./Notice"

const reducer = (state, action) => {
    console.log(action.payload)
    const { title, message } = action.payload;
    switch (action.type) {
        case "create":
            const newState = [ ...state, {title, message}];

            return newState;
    }
}
console.log(reducer)
export default reducer;