export const productAction=(data)=>{
    console.log("Data dari UI Componen",  data)
    return {
        type:"PRODUCT_SUCCESS",
        payload: data
    }
}