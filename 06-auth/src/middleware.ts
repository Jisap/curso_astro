import { defineMiddleware } from "astro:middleware";

const privateRoutes = ['/protected']


export const onRequest = defineMiddleware(({ url, request }, next) => {

  const authHeaders = request.headers.get('authorization')

  if( privateRoutes.includes( url.pathname )){

    if(authHeaders){
      return next()
    }


    return new Response('Auth Necesaria', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic real="Secure Area"',
      }
    })
  }

  return next()
});