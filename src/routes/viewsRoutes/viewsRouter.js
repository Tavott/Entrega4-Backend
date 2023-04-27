const{Router} =require('express');
const ProductManager = require('../../productsManager');
const viewRouter = Router();
const path = require('path');
const pathJson = path.join(`${__dirname}/../../../db/products.json`);

//Istancia Class
const adminProducts = new ProductManager(pathJson);
let allProducts =[];

const fetchProducts = async()=>{
    try{
        allProducts = await adminProducts.getProducts();
        console.log('allProducts', allProducts);
    }catch(error){
        console.log('Error: Producto no encontrado');
        throw Error(error);
    }
    return allProducts;
} 
fetchProducts();

viewRouter.get('/', async(req,res)=>{
    res.status(200).render('home',{products: allProducts});
})

viewRouter.get('/realtimeproducts', async(req, res)=>{
    res.status(200).render('realtimeproducts',{products: allProducts})
})

module.exports=viewRouter;
