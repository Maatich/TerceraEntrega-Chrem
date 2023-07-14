import cartsServices from "../repository/carts.repository.js";
import productsServices from "../repository/products.repository.js";
import ticketsServices from "../repository/tickets.repository.js";
import { v4 as uuidv4 } from "uuid";
import { CustomError } from "../errors/CustomErrors.services.js";
import { 
    generateUpdateCartErrorInfo, 
    generateCartErrorParams, 
    generateCartOrProductErrorParams, 
    generateProdsQuantityErrorParams, 
    generateCartNotFoundError 
} from "../errors/cartErrorsInfo.js";
import { EErrors } from "../errors/enums.js"

const cartsControler = {};

// Obtener todos los carritos
cartsControler.getCarts = async (req, res) => {
  try {
    const carts = await cartsServices.getCarts();
    res.status(carts.code).send({
      status: carts.status,
      message: carts.message,
    });
  } catch (error) {
    console.log(error);
  }
};

// Obtenemos un carrito según su ID para ver sus productos
cartsControler.getCartByID = async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartsServices.getCartByID(cid);
    res.status(cart.code).send({
      status: cart.status,
      message: cart.message,
    });
  } catch (error) {
    console.log(error);
  }
};
// Obtener el carrito del usuario en sesión
cartsControler.getCartByUserId = async (req, res) => {
  try {
    const cid = req.user.cartId.toString();
    const cart = await cartsServices.getCartByID(cid);
    res.status(cart.code).send({
      status: cart.status,
      message: cart.message,
    });
  } catch (error) {
    console.log(error);
  }
};

//Generamos un nuevo carrito
cartsControler.createCarts = async (req, res) => {
  try {
    const cart = await cartsServices.createCarts();
    res.status(cart.code).send({
      status: cart.status,
      message: cart.message,
      cart: cart.cart,
    });
  } catch (error) {
    console.log(error);
  }
};

// Agregamos un producto seleccionado según su ID al carrito asociado al user en sesión
cartsControler.addProduct = async (req, res) => {
  try {
    const cid = req.user.cartId.toString();
    const pid = req.body._id;
    const cart = await cartsServices.addProductInCartID(cid, pid);
    req.flash("success_msg", "Agregado con éxito.");
    res.redirect("/products");
  } catch (error) {
    console.log(error);
  }
};

// Agregamos un producto seleccionado según su ID al carrito seleccionado según su ID
cartsControler.addProductInCartID = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartsServices.addProductInCartID(cid, pid);
    res.status(cart.code).send({
      status: cart.status,
      message: cart.message,
    });
  } catch (error) {
    console.log(error);
  }
};

// Eliminamos un producto del carrito
cartsControler.deleteProductInCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartsServices.deleteProductInCart(cid, pid);
    req.flash("success_msg", "Producto eliminado con éxito.");
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

// Eliminamos todos los productos del carrito
cartsControler.deleteAllProductsInCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsServices.removeAllProductsFromCart(cid);
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
};

// Actualizamos productos en el carrito
cartsControler.updateProductsInCart = async (req, res) => {
  const cid = req.params.cid;
  const products = req.body;
  try {
    const cart = await cartsServices.updateCart(cid, products);
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
};

// Actualizamos un producto determinado al carrito seleccionado según su ID
cartsControler.updateIdProductInIdCart = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const { quantity } = req.body;
  try {
    const cart = await cartsServices.updateIdProductInIdCart(
      cid,
      pid,
      quantity
    );
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
};

cartsControler.purchase = async (req, res) => {
  try {
    const cartId = req.user.cartId.toString();
    const email = req.user.email;
    const cart = await cartsServices.getCartByID(cartId);
    if (cart) {
      if (!cart.message[0].products.length) {
        return res.send(
          "es necesario que agrege productos antes de realizar la compra"
        );
      }
      const ticketProducts = [];
      const rejectedProducts = [];
      
      for (let i = 0; i < cart.message[0].products.length; i++) {
        const cartProduct = cart.message[0].products[i];
        const productDB = await productsServices.getProductByID(
          cartProduct.product._id
        );
        //comparar la cantidad de ese producto en el carrito con el stock del producto
        if (cartProduct.quantity <= productDB.message.stock) {
          ticketProducts.push(cartProduct);
        } else {
          rejectedProducts.push(cartProduct);
        }
      }

      // Verificar si hay productos en el carrito
      if (ticketProducts.length === 0) {
        console.log("No hay suficiente stock para ninguno de los productos en el carrito")
        return res.send("No hay suficiente stock para ninguno de los productos en el carrito");
      }

      let amount = 0;
      // Eliminar los productos del carrito que fueron comprados
      for (let i = 0; i < ticketProducts.length; i++) {
        let pid = ticketProducts[i].product._id.toString();
        const quantity = ticketProducts[i].quantity;
        amount += ticketProducts[i].product.price * ticketProducts[i].quantity;
        if (quantity > 0) {
          for (let j = 0; j < quantity; j++) {
            await cartsServices.deleteProductInCart(cartId, pid);
          }
        }
      }

      console.log("Productos sin stock", rejectedProducts);
      const newTicket = {
        code: uuidv4(),
        purchase_datetime: new Date().toLocaleString(),
        amount: amount,
        purchaser: email,
      };
      const ticketCreated = await ticketsServices.createTicket(newTicket);
      res.send(ticketCreated);
    } else {
      res.send("el carrito no existe");
    }
  } catch (error) {
    res.send(error.message);
  }
};

export default cartsControler;
