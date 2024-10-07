
import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { db, eq, Product } from "astro:db";
import { getSession } from "auth-astro/server";
import { v4 as UUID } from 'uuid';

const MAX_FILE_SIZE = 5_000_000 // 5 MB
const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/gif']


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

    imageFiles: z.array(
      z.instanceof(File)
        .refine(file => file.size <= MAX_FILE_SIZE, 'Max image size 5MB' )
        .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), 'Invalid image type' )
    ).optional()
  }),
  handler: async (form, { request }) => {

    const session = await getSession(request);
    const user = session?.user;

    if(!user || !user.id) {
      throw new Error('Unauthorized');
    }

    const {id = UUID(),imageFiles, ...rest} = form;                           // Extraemos los valores de la entrada, si el id no está presente lo añadimos como UUID
    rest.slug = rest.slug.toLowerCase().replaceAll(' ', '-').trim();          // Limpiamos el slug

    const product = {                                                         // Creamos el producto
      id: id,
      user: user.id,
      ...rest
    }

    if(!form.id){                                                            // Si el formulario no tiene id, es un nuevo producto
      await db.insert(Product).values(product);                              // Insertamos el producto en bd para su creación
    }else{
      await db.update(Product).set(product).where(eq(Product.id, id));       // Sino Actualizamos el producto en bd
    }

    console.log(imageFiles);

    return { product }
  }
})