import { cartsDao, productsDao, chatsDao } from "../dao/factory.js";

const productsServices = {};

// Insertamos todos los productos
productsServices.insertMany = async () => {
  return productsDao.insertMany();
};

// Recibo todos los productos
productsServices.getProducts = async (limit, page, sort, category, status) => {
  return productsDao.getProducts(limit, page, sort, category, status);
};

// Recibo el producto en base a su ID
productsServices.getProductByID = async (pid) => {
  return productsDao.getProductByID(pid);
};

// Creamos un nuevo producto
productsServices.createProduct = async (_product) => {
  return productsDao.createProduct(_product);
};

// Modificamos un producto existente
productsServices.updateProduct = async (pid, product) => {
  return productsDao.updateProduct(pid, product);
};

// Eliminamos un producto
productsServices.deleteProduct = async (pid) => {
  return productsDao.deleteProduct(pid);
};

export default productsServices;
