export const productAction=(data)=>{
    console.log("Data dari UI Componen",  data)
    return {
        type:"GET_DATA_PRODUCTS",
        payload: data
    }
}