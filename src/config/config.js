import dotenv from "dotenv";

dotenv.config();

export const options = {
    server:{
        port: process.env.PORT,
        persistence: process.env.PERSISTENCE
    },
    mongo:{
        url: process.env.MONGODB_URI
    },

    admin:{
        correo: process.env.CORREO_ADMIN,
        password: process.env.PASSWORD_ADMIN,
    },
    session: {
        key: process.env.KEY
    },
    github:{
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL 
    }
}