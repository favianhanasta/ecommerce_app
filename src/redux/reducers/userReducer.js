const INITIAL_STATE = {
    id : null,
    username : "",
    email : "",
    role :"",
    status:""
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
                status:action.payload.status
            }
        default:
            return state
    }
}