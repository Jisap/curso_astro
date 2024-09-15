import { defineMiddleware } from "astro:middleware";
import { getSession } from 'auth-astro/server';

const notAuthenticatedRoutes = ['/login', '/register'];

export const onRequest = defineMiddleware(
  async ({ url, locals, redirect, request }, next) => {
    
    const session = await getSession(request);  // Utilizamos la session de Oauth para manejar el login. La session se guardó en cookies 
    const isLoggedIn = !!session                // Convertimos a boolean el estado de la session para poder usarlo en las condiciones de acceso a las rutas
    const user = session?.user;                 // Obtenemos el user de la session

   
    // Agregamos a locals los datos necesarios para renderizar la navbar

    locals.isLoggedIn = isLoggedIn;             // Guardamos el estado de la session en locals
    locals.user = null;                         // Guardamos el user en locals y lo inicializamos a null
    locals.isAdmin = false;                     // Guardamos el rol del user en locals y lo inicializamos a false

    if (user) {                                 // Si el user existe                
      locals.user = {                           // Actualizamos el user en locals
        name: user.name!,                       // con el nombre del user y del email obtenidos de la session controlada por Oauth
        email: user?.email!,
      };

      locals.isAdmin = user.role === 'admin';   // Si el user es admin, lo marcamos en locals
    }

    // TODO: Eventualmente tenemos que controlar el acceso por roles
    if (!isLoggedIn && url.pathname.startsWith('/dashboard')) {
      return redirect('/');
    }

    if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
      return redirect('/');
    }

    return next();
  }
);
