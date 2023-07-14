import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";

import { options } from "./config.js";
import cartsModel from "../dao/models/carts.models.js"
import usersModel from "../dao/models/users.model.js";
import {createHash, validatePassword } from "../utils.js";



const LocalStrategy = local.Strategy;

const initializePassport = () => {
    
    passport.serializeUser((user,done)=>{
        console.log(user)
        done(null, user._id)
    });
    
    passport.deserializeUser( async (id , done)=>{
        let user = await usersModel.findById(id);
        done(null, user)
    });

    passport.use('signup', new LocalStrategy({ passReqToCallback:true, usernameField:'email'}, async (req,username,password,done) =>{
            const {first_name, last_name, email, age } = req.body;
            try {
                let user = await usersModel.findOne({email:username});
                if(user){
                    console.log('El usuario existe');
                    return done(null,false);
                }
                const isAdmin = email === options.admin.correo && password === options.admin.password;
                // Se crea el carrito
                const newCart = {
                    products: []
                };
                const cart = await cartsModel.create(newCart);
                // Se crea el usuario

                const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                        cartId: cart._id, //se asocia el id del carrito al usuario
                        role: isAdmin ? "Administrador" : "Usuario"
                }
                let result = await usersModel.create(newUser); // Se pasa el usuario con su carito asignado
                return done(null, result);
            } catch (error) {
                return done("Error al obtener el usuario: " + error)
            }
        }
    ));
        
    passport.use('signin', new LocalStrategy({usernameField:'email'}, async (username, password, done)=>{
        try {
           const user = await usersModel.findOne({email:username})
           if(!user){
                console.log('No existe el usuario');
                return done(null, false);
            }
            if(!validatePassword(password,user)) return done (null, false);
            return done(null,user);
        } catch (error) {
            return done("Error al intentar ingresar: " + error);            
        }
    }));

    passport.use('github', new GitHubStrategy({
        clientID: options.github.clientID,
        clientSecret: options.github.clientSecret,
        callbackURL: options.github.callbackURL
    }, async (accesToken, refreshToken,profile,done)=>{
        try {
            let user = await usersModel.findOne({email: profile._json.email})

            // Se crea el carrito
            const newCart = {
                products: []
            };
            const cart = await cartsModel.create(newCart);
            console.log(cart._id)
            // Se crea el usuario

            if(!user){
                const email = profile._json.email == null ?  profile._json.username : null;
                const newUser = {
                        first_name: profile._json.name,
                        last_name: "",
                        email: profile._json.email,
                        age: "",
                        password: "",
                        cartId: cart._id, //se asocia el id del carrito al usuario
                        role: "GitHub",
                }
                const result = await usersModel.create(newUser);
                done(null,result)
            }else{
                done(null, user)
            }
        } catch (error) {
            return done(null,error)
        }
    }))
}


export default initializePassport;