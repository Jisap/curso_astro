




import { firebase } from "@/firebase/config";
import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";


export const loginWithGoogle = defineAction({
  accept: 'json',
  input: z.any(),
  handler: async (credentials) => {

    const credential = GoogleAuthProvider.credentialFromResult(credentials);   // 1º Obtener las credenciales del objeto resultante de la autenticación de Google
    
    if(!credential){
      throw new Error('Google Sign In failed')
    }

    await signInWithCredential(firebase.auth, credential);                    // Autenticar al usuario en Firebase con las credenciales obtenidas 
    
    return { ok: true}
  }
})