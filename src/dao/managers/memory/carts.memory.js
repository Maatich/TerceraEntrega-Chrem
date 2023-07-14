const carts = [];

const products = [
  // Array de productos...
];

export class CartsMemory {
  // Recibo todos los carritos
  getCarts() {
    if (carts.length === 0) {
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado ningún carrito",
      };
    }
    return {
      code: 202,
      status: "Success",
      message: carts,
    };
  }

  // Recibo el carrito en base a su ID
  getCartByID(cid) {
    const cart = carts.find((cart) => cart._id === cid);
    if (!cart) {
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un carrito con ese número de ID",
      };
    }
    return {
      code: 202,
      status: "Success",
      message: cart,
    };
  }

  // Creamos un nuevo carrito
  createCarts() {
    const newCart = {
      _id: generateID(),
      products: [],
    };
    carts.push(newCart);
    return {
      code: 202,
      status: "Success",
      message: newCart,
    };
  }

  // Agregamos un producto seleccionado según su ID al carrito seleccionado según su ID
  addProductInCartID(cid, pid) {
    const cart = carts.find((cart) => cart._id === cid);
    if (!cart) return `El carrito con el id ${cid} no existe`;
    const product = products.find((product) => product._id === pid);
    if (!product) return `El producto con el id ${pid} no existe`;

    let productsInCart = cart.products;
    const indexProduct = productsInCart.findIndex(
      (product) => product.product === pid
    );
    if (indexProduct === -1) {
      const newProduct = {
        product: pid,
        quantity: 1,
      };
      productsInCart.push(newProduct);
    } else {
      productsInCart[indexProduct].quantity += 1;
    }

    return {
      code: 202,
      status: "Success",
      message: cart,
    };
  }

  // Eliminamos productos del carrito
  deleteProductInCart(cid, pid) {
    const cart = carts.find((cart) => cart._id === cid);
    if (!cart) return `El carrito que buscas no existe`;

    const productIndex = cart.products.findIndex(
      (item) => item.product === pid
    );
    if (productIndex === -1) return `El producto no existe en este carrito`;

    const quantity = cart.products[productIndex].quantity;
    if (quantity > 1) {
      cart.products[productIndex].quantity = quantity - 1;
    } else {
      cart.products.splice(productIndex, 1);
    }

    return cart;
  }

  // Eliminamos todos los productos del carrito
  deleteAllProductsInCart(cid) {
    const cart = carts.find((cart) => cart._id === cid);
    if (!cart) return `El carrito no existe`;

    cart.products = [];

    return cart;
  }

  // Actualizamos los productos del carrito
  updateProductsInCart(cid, products) {
    const cart = carts.find((cart) => cart._id === cid);
    if (!cart) return `El carrito no existe`;

    cart.products = products;

    return cart;
  }

  // Actualizamos la cantidad de productos del carrito
  updateIdProductInIdCart(cid, pid, quantity) {
    const cart = carts.find((cart) => cart._id === cid);
    if (!cart) return `El carrito no existe`;

    const updateProduct = cart.products.find((p) => p.product === pid);
    if (updateProduct) {
      updateProduct.quantity = quantity;
    }

    return cart;
  }
}

// Función para generar un ID único en memoria
function generateID() {
  return "_" + Math.random().toString(36).substring(2, 15);
}
