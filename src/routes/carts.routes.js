import { Router } from 'express';
import cartsController from "../controllers/carts.controller.js"
import {isAuthenticated} from "../helpers/auth.js"
import {userAccess} from "../helpers/roleValidate.js"


const router = Router();

const {
    getCarts,
    getCartByID,
    createCarts,
    addProduct,
    addProductInCartID,
    deleteProductInCart,
    deleteAllProductsInCart,
    updateProductsInCart,
    updateIdProductInIdCart,
    purchase
} = cartsController;

// Obtener todos los carritos
router.get("/", isAuthenticated, getCarts);

// Obtenemos un carrito según su ID para ver sus productos
router.get("/:cid", isAuthenticated, getCartByID);

//Generamos un nuevo carrito
router.post("/", createCarts);

// Agregamos un producto seleccionado según su ID al carrito asociado al user en sesión
router.post("/mycart", isAuthenticated, userAccess, addProduct);

// Agregamos un producto seleccionado según su ID al carrito seleccionado según su ID
router.post("/:cid/products/:pid", isAuthenticated, addProductInCartID);

// Eliminamos un producto del carrito
router.delete("/:cid/products/:pid", isAuthenticated, deleteProductInCart);

// Eliminamos todos los productos del carrito
router.delete("/:cid", isAuthenticated, deleteAllProductsInCart);

// Actualizamos productos en el carrito
router.put("/:cid", isAuthenticated, updateProductsInCart);

// Actualizamos un producto determinado al carrito seleccionado según su ID
router.put(":cid/products/:pid", isAuthenticated, updateIdProductInIdCart);

// Efectuamos la compra de los productos que están en el carrito 
router.post("/:cid/purchase", isAuthenticated, userAccess, purchase);


export default router;