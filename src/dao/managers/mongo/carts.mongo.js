import cartsModel from "../../models/carts.models.js";
import productsModel from "../../models/products.model.js";

export class CartsMongo {
  
  // Recibo todos los carritos
  getCarts = async () => {
    const carts = await cartsModel.find();
    console.log(JSON.stringify(carts, null, "\t"));
    if (!carts) {
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un carrito con ese número de ID",
      };
    };
    return {
      code: 202,
      status: "Success",
      message: carts,
    };
  };

  // Recibo el carrito en base a su ID
  getCartByID = async (cid) => {
    const cart = await cartsModel.find({ _id: cid });
    if (!cart) {
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un carrito con ese número de ID",
      };
    };
    return {
      code: 202,
      status: "Success",
      message: cart,
    };
  };

  // Creamos un nuevo carrito
  createCarts = async () => {
    const cart = await cartsModel.create({});
    return {
      code: 202,
      status: "Success",
      message: cart,
    };
  };

  // Agregamos un producto seleccionado según su ID al carrito seleccionado según su ID
  addProductInCartID = async (cid, pid) => {
    const cart = await cartsModel.findOne({ _id: cid });
    if (!cart) return `El carrito con el id ${cid} no existe`;
    const product = await productsModel.findOne({ _id: pid });
    if (!product) return `El producto con el id ${pid} no existe`;
  
    let productsInCart = cart.products;
    const indexProduct = productsInCart.findIndex((product) => product.product == pid);
    if (indexProduct === -1) {
      const newProduct = {
        product: pid,
        quantity: 1
      };
      productsInCart.push(newProduct);
    } else {
      productsInCart[indexProduct].quantity += 1;
    }
    await cart.save();
    return {
      code: 202,
      status: "Success",
      message: cart
    };
  };

  // Eliminamos productos del carrito
  deleteProductInCart = async (cid, pid) => {
    const product = await productsModel.findOne({ _id: pid });
  if (!product) return `El producto no existe en este carrito`;

  const cart = await cartsModel.findOne({ _id: cid });
  if (!cart) return `El carrito que buscas no existe`;

  const productIndex = cart.products.findIndex((item) => item.product.toString() === pid);
  if (productIndex === -1) return `El producto no existe en este carrito`;

  const quantity = cart.products[productIndex].quantity;
  if (quantity > 1) {
    cart.products[productIndex].quantity = quantity - 1;
  } else {
    cart.products.splice(productIndex, 1);
  }

  await cart.save();
  return cart;
  };

  // Eliminamos todos los productos del carrito
  deleteAllProductsInCart = async (cid) => {
    const cart = await cartsModel.findOne({ _id: cid });
    if (!cart) return `El carrito no existe`;
    cart.products = [];
    await cart.save();
    return cart;
  };

  // Actualizamos los productos del carrito
  updateProductsInCart = async (cid, products) => {
    const cart = await cartsModel.findOne({ _id: cid });
    if (!cart) return `El carrito no existe`;
    cart.set({ products });
    await cart.save();
    return cart;
  };

  // Actualizamos la cantidad de productos del carrito
  updateIdProductInIdCart = async (cid, pid, quantity) => {
    const cart = await cartsModel.findOne({ _id: cid });
    if (!cart) return `El carrito no existe`;
    const product = await productsModel.findOne({ _id: pid });
    if (!product) return `El producto no existe`;
    const updateProduct = cart.products.find((p) => p.product == pid);
    updateProduct.quantity = quantity;
    await cart.save();
    return cart;
  };
};
