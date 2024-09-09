import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const privateRoutes = ['/protected']
const notAuthenticatedRoutes = ['/login', '/register']

export const onRequest = defineMiddleware(({ url, request, locals, redirect }, next) => {

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

if( !isLoggedIn && privateRoutes.includes(url.pathname) ){        // Si el usuario no esta logueado y quiere entrar a una ruta privada
  return redirect('/')
}

if( isLoggedIn && notAuthenticatedRoutes.includes(url.pathname) ){ // Si el usuario esta logueado y quiere entrar a una ruta pública
  return redirect('/')
}

return next()

})