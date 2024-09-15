
import { DefaultSession, DefaultUser } from "@auth/core/types"


declare module '@auth/core/types' {             // Para poder usar el user de la session de Oauth
  
  interface User extends DefaultUser{           // Definimos el user de la session de Oauth
    role?: string                               // y agregamos el rol del user
  }  

  interface Session extends DefaultSession{     // Definimos la session de Oauth
    user: User                                  // y agregamos el user
  }
}