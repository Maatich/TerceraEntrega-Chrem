import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import {isAuthenticated} from "../helpers/auth.js"
import {adminAccess} from "../helpers/roleValidate.js"

const router = Router();

const {
    insertMany,
    getProducts,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct
} = productsController;

// Insertamos todos los productos
router.get("/insertion", insertMany);

// Recibo todos los productos
router.get("/", getProducts);

// Recibo el producto en base a su ID
router.get("/:pid", getProductByID);

// Creamos un nuevo producto
router.post("/", isAuthenticated, adminAccess, createProduct);

// Modificamos un producto existente
router.post("/:pid", isAuthenticated, adminAccess, updateProduct);

// Eliminamos un producto
router.delete("/:pid", isAuthenticated, adminAccess, deleteProduct);

export default router;
