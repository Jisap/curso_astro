import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";



export const onRequest = defineMiddleware(({ url, request, locals }, next) => {

const isLoggedIn = !!firebase.auth.currentUser;     // Verificar si el usuario esta logueado
locals.isLoggedIn = isLoggedIn;                     // Guardar en locals el estado del logueo para ser usado en layouts o navbar

const user = firebase.auth.currentUser;             // Obtener el usuario logueado  

if(user){                                           // Si el usuario esta logueado                     
  locals.user = {                                   // Guardar en locals el usuario logueado para ser usado en layouts o navbar
    avatar: user.photoURL ?? '',
    email: user.email!,
    name: user.displayName!,
    emailVerified: user.emailVerified
  }
}



return next()

})