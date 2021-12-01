import axios from "axios"
import { API_URL } from "../../helper"


export const productAction = (nama,min,max) =>{
    return async (dispatch)=>{
        try{
            let res;
            if(nama){
                res = await axios.get(`${API_URL}/products?nama=${nama}`)
            }else if(min,max){
                res = await axios.get(`${API_URL}/products?harga_gte=${min}&harga_lte=${max}`)
            }
            else{
                res = await axios.get(`${API_URL}/products`)
            }
            dispatch({
                type:"GET_DATA_PRODUCTS",
                payload: res.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export const sortAction = (sort=null)=>{
    return async (dispatch)=>{
        try{
            let res;
            if(sort){
                if(sort.hargaAsc){
                    res=await axios.get(`${API_URL}/products?_sort=harga&_order=asc`)
                }else if(sort.hargaDsc){
                    res=await axios.get(`${API_URL}/products?_sort=harga&_order=desc`)
                }else if(sort.namaAsc){
                    res=await axios.get(`${API_URL}/products?_sort=nama&_order=asc`)
                }else if(sort.namaDsc){
                    res=await axios.get(`${API_URL}/products?_sort=nama&_order=desc`)
                }else if(sort.reset){
                    res = await axios.get(`${API_URL}/products`)
                }
            }else{
                res = await axios.get(`${API_URL}/products`)
            }
            dispatch({
                type:"GET_DATA_PRODUCTS",
                payload: res.data
            })
        }catch(error){
            console.log(error)
        }
    }
}



