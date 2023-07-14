import {cartsDao, productsDao, chatsDao} from "../dao/factory.js"

const cartsServices = {};

// Obtener todos los carritos
cartsServices.getCarts = async () => {
    return await cartsDao.getCarts();
};

// Obtenemos un carrito según su ID para ver sus productos
cartsServices.getCartByID = async (cid) => {
    return await cartsDao.getCartByID(cid);
};

//Generamos un nuevo carrito
cartsServices.createCarts = async () => {
    return await cartsDao.createCarts();
};

// Agregamos un producto seleccionado según su ID al carrito seleccionado según su ID
cartsServices.addProductInCartID = async (cid, pid) => {
    return await cartsDao.addProductInCartID(cid, pid);
};

// Eliminamos un producto del carrito seleccionado según su ID
cartsServices.deleteProductInCart = async (cid, pid) => {
    return await cartsDao.deleteProductInCart(cid, pid);
};

// Eliminamos todos los productos del carrito
cartsServices.deleteAllProductsInCart = async (cid) => {
    return await cartsDao.deleteAllProductsInCart(cid);
};

// Actualizamos productos en el carrito
cartsServices.updateProductsInCart = async (cid, products) => {
    return await cartsDao.updateProductsInCart(cid, products);
};

// Actualizamos un producto determinado al carrito seleccionado según su ID
cartsServices.updateIdProductInIdCart = async (cid, pid, quantity) => {
    return cartsDao.updateIdProductInIdCart(cid, pid, quantity);
};


export default cartsServices;