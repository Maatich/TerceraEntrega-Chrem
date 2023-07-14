import productsModel from "../dao/models/products.model.js";
import cartsServices from "../repository/carts.repository.js";


const viewsControler = {};

// Muestra el home
viewsControler.renderIndex = (req, res) => {
  console.log(req.user)
  res.render("index")};

// Muestra todos los productos
viewsControler.renderProducts = async (req, res) => {
  const products = await productsModel.find().lean();
  res.render("products/all-products", { products })};

// Muestra las mascotas encontradas
viewsControler.renderFound = (req, res) => {res.render("found")};

// Muestra las mascotas perdidas
viewsControler.renderLosses = (req, res) => {res.render("losses")};

// Muestra el acerca de nosotros
viewsControler.renderAbout = (req, res) => {res.render("about")};

// Muestra el carrito asociado a la sesión
viewsControler.renderMyCart = async (req, res) => {

  if(!req.user) return res.status(400).send({status:"error", error: 'Invalid credentials'});
  const cid = req.user.cartId.toString();
  const myCart = await cartsServices.getCartByID(cid);
  
  if (!myCart || myCart.message.length === 0) {
    // Manejo del error si no se pudo obtener el carrito
    return res.status(500).json({ error: "Error al obtener el carrito" });
  }
  const cart = myCart.message[0];
  const products = cart.products;
  const productDetails = products.map((product) => {
    return {
      pid: product.product._id.toString(),
      title: product.product.title,
      price: product.product.price,
      thumbnail: product.product.thumbnail,
      stock: product.product.stock,
      description: product.product.description,
      quantity: product.quantity,
      cid: cid
    };
  });
  res.render("mycart", { products: productDetails });
};

// Muestra el formulario de registro
viewsControler.renderSignUpForm = (req, res) => {res.render("signup")};

// Muestra el formulario de inicio de sesión
viewsControler.renderSignInFrom = (req, res) => {res.render("signin")};

// Muestra el perfil del usuario
viewsControler.renderSignProfile = (req, res) => {res.render('profile',{user: req.session.user})};

// Muestra el formulario para restablecer la contraseña
viewsControler.renderResetPassword = (req, res) => {res.render("resetpassword")};


export default viewsControler;