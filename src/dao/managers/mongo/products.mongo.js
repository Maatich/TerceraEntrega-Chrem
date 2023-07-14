import productsModel from "../../models/products.model.js";

const list = [
  {
    title: "Pedigree - Carne&Vegetales - 21 kg",
    description:
      "Óptima Digestión Etapa 2 para perro adulto todos los tamaños sabor carne y vegetales.",
    price: 6893,
    thumbnail:
      "",
    code: "abc1",
    stock: 25,
    status: true,
    category: "perro",
  },
  {
    title: "Pedigree - Sano crecimiento - 21kg",
    description:
      "Sano Crecimiento Etapa 1 para perro cachorro todos los tamaños sabor mix",
    price: 7361,
    thumbnail:
      "",
    code: "abc2",
    stock: 22,
    status: true,
    category: "perro",
  },
  {
    title: "Pedigree - Vida plena | Etapa 3 - 8kg",
    description:
      "Vida Plena Etapa 3 para perro senior todos los tamaños sabor mix.",
    price: 4025,
    thumbnail:
      "",
    code: "abc3",
    stock: 32,
    status: true,
    category: "perro",
  },
  {
    title: "Cat Chow - Temprana edad - 8kg",
    description: "El mejor alimento para gato de temprana edad sabor mix.",
    price: 6834,
    thumbnail:
      "",
    code: "abc4",
    stock: 56,
    status: true,
    category: "gato",
  },
  {
    title: "Cat Chow - Adultos | Sabor carne - 8kg",
    description: "El mejor alimento para gato adulto sabor carne.",
    price: 5719,
    thumbnail:
      "",
    code: "abc5",
    stock: 35,
    status: true,
    category: "gato",
  },
  {
    title: "Cat Chow - Adultos | Sabor pescado - 15kg",
    description: "El mejor alimento para gato adulto sabor pescado.",
    price: 9515,
    thumbnail:
      "",
    code: "abc6",
    stock: 18,
    status: true,
    category: "gato",
  },
  {
    title: "Rascador para gatos con cucha y pompón",
    description:
      "Rascador 1 piso con cucha en el primer piso y con pompón que los hace jugar.",
    price: 3690,
    thumbnail:
      "",
    code: "abc7",
    stock: 24,
    status: true,
    category: "accesorios",
  },
  {
    title: "Casa para gato | Orejitas large",
    description: "Cucha cama para gatitos super suave y resistente MEDIUM.",
    price: 11770,
    thumbnail:
      "",
    code: "abc8",
    stock: 25,
    status: true,
    category: "accesorios",
  },
  {
    title: "Casa para perro | Grande y térmica",
    description:
      "Casa para perro diseñada con el tamaño ideal para razas mediana y grandes.",
    price: 29995,
    thumbnail:
      "",
    code: "abc9",
    stock: 15,
    status: true,
    category: "accesorios",
  },
];

export class ProductsMongo {

  // Insertamos todos los productos
  insertMany = async (req, res) => {
    const products = await productsModel.insertMany(list);
    if (!products) {
      return {
        code: 400,
        status: "Error",
        message: "No se han podido cargar los productos",
      };
    }
    return {
      code: 202,
      status: "Success",
      message: products,
    };
  };

  // Recibo todos los productos
  getProducts = async (limit, page, sort, category, status) => {
    //const products = await productsModel.paginate({ lean: true });
    const products = await productsModel.aggregate([
      { $group: { _id: "$price", products: { $push: "$$ROOT" } } },
      { $sort: { _id: -1 } },
    ]);
    if (!products) {
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un producto con ese número de ID",
      };
    }
    return {
      code: 202,
      status: "Success",
      message: products,
    };
  };

  // Recibo el producto en base a su ID
  getProductByID = async (pid) => {
    const product = await productsModel.findOne({ _id: pid });
    if (!product) {
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un producto con ese número de ID",
      };
    }
    return {
      code: 202,
      status: "Success",
      message: product,
    };
  };

  // Creamos un nuevo producto
  createProduct = async (_product) => {
    const newProduct = {
      title: _product.title,
      description: _product.description,
      price: _product.price,
      thumbnail: _product.thumbnail,
      code: _product.code,
      stock: _product.stock,
      status: true,
      category: _product.category,
    };
    try {
      const result = await productsModel.create(newProduct);
      return {
        code: 202,
        status: "Success",
        message: `El producto |${_product.title}| ha sido agregado con éxito`,
      };
    } catch (error) {
      return {
        code: 400,
        status: "Error",
        message: `${error}`,
      };
    }
  };

  // Modificamos un producto existente
  updateProduct = async (pid, product) => {
    const products = await this.getProducts();
    const productIndex = products.findIndex((product) => product.id === pid);
    products[productIndex].title = product.title;
    (products[productIndex].description = product.description),
      (products[productIndex].code = product.code),
      (products[productIndex].price = product.price),
      (products[productIndex].status = product.status),
      (products[productIndex].stock = product.stock),
      (products[productIndex].category = product.category),
      (products[productIndex].thumbnails = product.thumbnails);
    try {
      const result = await productsModel.updateOne(
        { _id: pid },
        { $set: product }
      );
      return {
        code: 202,
        status: "Success",
        message: `El producto |${product.title}| ha sido modificado con éxito`,
      };
    } catch (error) {
      return {
        code: 400,
        status: "Error",
        message: `${error}`,
      };
    }
  };

  // Eliminamos un producto
  deleteProduct = async (pid) => {
    const product = await productsModel.deleteOne({ _id: pid });
    if (!product) {
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un producto con ese número de ID",
      };
    }
    return {
      code: 202,
      status: "Success",
      message: product,
    };
  };
}
