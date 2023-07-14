const list = [
  {
    title: "Pedigree - Carne&Vegetales - 21 kg",
    description:
      "Óptima Digestión Etapa 2 para perro adulto todos los tamaños sabor carne y vegetales.",
    price: 6893,
    thumbnail:
      "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/02.webp",
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
      "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/01.webp",
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
      "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/03.webp",
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
      "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/04.webp",
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
      "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/05.webp",
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
      "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/06.webp",
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
      "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/07.webp",
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
      "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/08.webp",
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
      "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/09.webp",
    code: "abc9",
    stock: 15,
    status: true,
    category: "accesorios",
  },
];

export class ProductsMemory {

  constructor() {
    this.products = [];
  }

  insertMany() {
    const updatedList = list.map((product) => ({
      ...product,
      _id: generateID(),
    }));
    this.products = [...updatedList];
  }

  getProducts() {
    const products = this.products;
    return {
      code: 202,
      status: "Success",
      message: products,
    };
  }

  getProductByID(pid) {
    const product = this.products.find((product) => product._id === pid);
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
  }

  createProduct(product) {
    const newProduct = {
      _id: Date.now().toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
      status: true,
      category: product.category,
    };

    this.products.push(newProduct);

    return {
      code: 202,
      status: "Success",
      message: `El producto "${product.title}" ha sido agregado con éxito`,
    };
  }

  updateProduct(pid, product) {
    const productIndex = this.products.findIndex(
      (product) => product._id === pid
    );
    if (productIndex === -1) {
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un producto con ese número de ID",
      };
    }

    this.products[productIndex].title = product.title;
    this.products[productIndex].description = product.description;
    this.products[productIndex].price = product.price;
    this.products[productIndex].thumbnail = product.thumbnail;
    this.products[productIndex].code = product.code;
    this.products[productIndex].stock = product.stock;
    this.products[productIndex].status = product.status;
    this.products[productIndex].category = product.category;

    return {
      code: 202,
      status: "Success",
      message: `El producto "${product.title}" ha sido modificado con éxito`,
    };
  }

  deleteProduct(pid) {
    const productIndex = this.products.findIndex(
      (product) => product._id === pid
    );
    if (productIndex === -1) {
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un producto con ese número de ID",
      };
    }

    const deletedProduct = this.products.splice(productIndex, 1)[0];

    return {
      code: 202,
      status: "Success",
      message: deletedProduct,
    };
  }
}

// Función para generar un ID único en memoria
function generateID() {
  return "_" + Math.random().toString(36).substring(2, 15);
}
