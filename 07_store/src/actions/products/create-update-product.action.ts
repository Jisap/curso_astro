
import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { db, eq, Product } from "astro:db";
import { getSession } from "auth-astro/server";
import { v4 as UUID } from 'uuid';

export const createUpdateProduct = defineAction({
  accept: 'form',
  input: z.object({
    id: z.string().optional(),
    stock: z.number(),
    slug: z.string(),
    price: z.number(),
    sizes: z.string(),
    type: z.string(),
    tags: z.string(),
    title: z.string(),
    description: z.string(),
    gender: z.string(),

    
  }),
  handler: async (form, { request }) => {

    const session = await getSession(request);
    const user = session?.user;

    if(!user) {
      throw new Error('Unauthorized');
    }

    const {id = UUID(),  ...rest} = form;                                     // Extraemos los valores de la entrada, si el id no está presente lo añadimos como UUID
    rest.slug = rest.slug.toLowerCase().replaceAll(' ', '-').trim();          // Limpiamos el slug

    const product = {                                                         // Creamos el producto
      id: id,
      user: user.id,
      ...rest
    }
console.log(product);
    await db.update(Product).set(product).where(eq(Product.id, id));          // Actualizamos el producto en bd

    return { product }
  }
})