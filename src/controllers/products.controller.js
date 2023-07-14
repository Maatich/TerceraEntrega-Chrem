import productsServices from "../repository/products.repository.js";

const productsController = {};

// Insertamos todos los productos
productsController.insertMany = async (req, res) => {
  const products = await productsServices.insertMany();
  console.log("Productos cargados")
  res.send({ products });
};

// Recibo todos los productos
productsController.getProducts = async (req, res) => {
  const { limit, page, sort, category, status } = req.query;
  try {
    const options = {
      limit: limit || 3,
      page: page || 1,
      sort: { price: sort === "asc" ? 1 : -1 },
      lean: true,
    };

    if (status != undefined) {
      const products = await productsServices.getProducts(
        { status: status },
        options
      );
      return res.json({ products });
    }

    if (category != undefined) {
      const products = await productsServices.getProducts(
        { category: category },
        options
      );
      return res.json({ products });
    }
    const products = await productsServices.getProducts();

    res.json({ products });
  } catch (error) {
    console.log(error);
  }
};

// Recibo el producto en base a su ID
productsController.getProductByID = async (req, res) => {
  try {
    const pid = req.params.pid;
    const productByID = await productsServices.getProductByID(pid);
    res.status(productByID.code).send({
      status: productByID.status,
      message: productByID.message,
    });
  } catch (error) {
    console.log(error);
  }
};

// Creamos un nuevo producto
productsController.createProduct = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productsServices.createProduct(product);
    res.status(newProduct.code).send({
      status: newProduct.status,
      message: newProduct.message,
    });
  } catch (error) {
    console.log(error);
  }
};

// Modificamos un producto existente
productsController.updateProduct = async (request, response) => {
  try {
    const pid = request.params.pid;
    const product = request.body;
    const respuesta = await productsServices.updateProduct(pid, product);
    response.status(respuesta.code).send({
      status: respuesta.status,
      message: respuesta.message,
    });
  } catch (error) {
    console.log(error);
  }
};

// Eliminamos un producto
productsController.deleteProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const productByID = await productsServices.deleteProduct(pid);
    res.status(productByID.code).send({
      status: productByID.status,
      message: productByID.message,
    });
  } catch (error) {
    console.log(error);
  }
};


export default productsController;