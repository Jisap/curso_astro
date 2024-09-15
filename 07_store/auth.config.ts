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

        const [user] = await db
          .select()
          .from(User)
          .where(eq(User.email, `${email}`));

        if(!user) {
          throw new Error('No existe el usuario');
        }

        if(!bcrypt.compareSync(password as string, user.password)) {
          throw new Error('Contraseña incorrecta');
        }

        const { password: _, ...rest } = user;

        return rest
          
        
      }
    })
  ],
});