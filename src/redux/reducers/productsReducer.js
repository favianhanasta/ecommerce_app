const INITIAL_STATE ={
    id : null,
    nama : "",
    deskripsi :"",
    brand:"",
    kategori:"",
    harga:"",
    stock: [],
    images: []
}

export const productsReducer =(state=INITIAL_STATE,action) =>{
    switch (action.type) {
        case "PRODUCT_SUCCESS":
            console.log("data dari payload", action.payload)
            return {
                ...state,
                id : action.payload.id,
                nama : action.payload.nama,
                deskripsi: action.payload.deskripsi,
                kategori: action.payload.kategori,
                harga : action.payload.harga,
                stok : action.payload.stock,
                images : action.payload.images
            }
            
    
        default:
            return state
    }
}

