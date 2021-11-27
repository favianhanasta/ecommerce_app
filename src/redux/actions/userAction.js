 
export const loginAction=(data)=>{
    console.log("Data dari UI Componen",  data)
    return {
        type:"LOGIN_SUCCESS",
        payload: data
    }
}

export const logOutAction=()=>{
    return{
        type:"LOGOUT"
    }
}