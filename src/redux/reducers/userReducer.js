const INITIAL_STATE = {
    id : null,
    username : "",
    email : "",
    role :"",
    status:"",
    cart:[]
}


export const userReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("data dr payload", action.payload)
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                role:action.payload.role,
                status:action.payload.status,
                cart:action.payload.cart
            }
        case "LOGOUT":
            return INITIAL_STATE
        case "UPDATE_CART_USER":
            console.log("cart ambil",action.payload)
            return { ...state, cart: action.payload }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}