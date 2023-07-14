import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import passport from "passport";
import methodOverride from "method-override";
import flash from "connect-flash";
import morgan from "morgan";

import { options } from "./config/config.js";
import __dirname from "./utils.js";
import viewRouter from "./routes/views.routes.js";
import chatsRouter from "./routes/chat.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import productsRouter from "./routes/products.routes.js";
import sessionsRouter from "./routes/sessions.routes.js";
import initializePassport from "./config/passport.config.js";
import errorHandler from './helpers/errorHandler.js'

//Inicializations
const app = express();
initializePassport();

//Settings
app.set("port", options.server.port);
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    store: new MongoStore({
      mongoUrl: options.mongo.url,
      ttl: 3600,
    }),
    secret: options.session.key,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Global Variables
app.use((req, res, next) => {
  app.locals.success_msg = req.flash("success_msg");
  app.locals.error_msg = req.flash("error_msg");
  app.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use("/", viewRouter);
app.use("/chat", chatsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/api/sessions", sessionsRouter);

// Static files
app.use(express.static(__dirname + "/public"));

//Error handler
app.use(errorHandler);


export default app;