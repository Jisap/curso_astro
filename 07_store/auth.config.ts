import Credentials from '@auth/core/providers/credentials';
import { db, eq, User } from 'astro:db';
import { defineConfig } from 'auth-astro';
import bcrypt from 'bcryptjs';

export default defineConfig({
  providers: [
    Credentials({
      credentials:{
        email: { label: 'Correo', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      authorize: async({email, password}) => {

        const [user] = await db                                       // Obtenemos un usuario de la bd según email y contraseña
          .select()
          .from(User)
          .where(eq(User.email, `${email}`));

        if(!user) {                                                   // Si no existe el usuario mensaje de error                         
          throw new Error('No existe el usuario');
        }

        if(!bcrypt.compareSync(password as string, user.password)) {  // Si la contraseña no es correcta mensaje de error
          throw new Error('Contraseña incorrecta');
        }

        const { password: _, ...rest } = user;                        // Si la contraseña es correcta devuelve el user sin la contraseña

        return rest                                                   // Al final se devuelve un user y auth crea una session con las cookies
          
        
      }
    })
  ],
});