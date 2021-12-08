import axios from "axios"
import { API_URL } from "../../helper"
 
export const loginAction=(email,password)=>{
    return async (dispatch)=>{
        try{
            let response = await axios.get(`${API_URL}/dataUser?email=${email}&password=${password}`)
            if(response.data.length>0){
                localStorage.setItem("data", JSON.stringify(response.data[0]))
                dispatch({
                    type:"LOGIN_SUCCESS",
                    payload: response.data[0]
                })
                return{success:true}
            }
        }catch(error){
            console.log(error)
        }
    }
}

export const logOutAction=()=>{
    return{
        type:"LOGOUT"
    }
}

export const updateUserCart = (data, id) => {
    return async (dispatch) =>{
        try{
        let res = await axios.patch(`${API_URL}/dataUser/${id}`,{cart:data})
            dispatch ({
                type: "UPDATE_CART_USER",
                payload: res.data.cart
            })
            return {success:true}
        }
        catch(error){
            console.log(error)

        }
    }
}