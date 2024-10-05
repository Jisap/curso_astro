

import type { ProductWithImages } from "@/interfaces";
import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { db, Product, count, ProductImage, eq, sql } from "astro:db";

export const getProductsByPage = defineAction({   
  accept: 'json',
  input: z.object({
    page: z.number().optional().default(1),         // Número de página
    limit: z.number().optional().default(10),       // Número de registros por página
  }),
  handler: async ({ page, limit }) => {

    page = page <= 0 ? 1 : page;                                               // El número de página debe ser mayor o igual a 1

    const [totalRecords] = await  db.select({ count: count() }).from(Product); // Número total de registros
    const totalPages = Math.ceil(totalRecords.count / limit);                  // Calcula el número de páginas según el limite y el total de registros

    if(page > totalPages){                                                     // Si la página solicitada es mayor que el número total de páginas
      return {
        products: [] as ProductWithImages[],                                   // Devuelve una lista vacía
        totalPages: totalPages,                                                // Devuelve el número total de páginas
      }
    }

    // Este query devuelve productos junto con hasta dos imágenes por cada producto, concatenadas en una cadena

    // const productsQuery = sql`                                               // Creamos una sentencia SQL
    //   select a.*,                                                            // seleccionamos todas las columnas de la tabla Product (alias a) utilizando a.*
    //     ( select GROUP_CONCAT(image,',') from                                    // Concatena las imágenes seleccionadas separándolas por comas. La imagenes seleccionadas provienen de la siguiente consulta.
	  //       ( select * from ${ProductImage} where productId = a.id limit 2 )       // Selecciona todas las columnas de la tabla ${ProductImage} donde los ids coinciden con los ids de la tabla Product
    //     ) as images                                                              // El resultado se almacena en la columna images.
    //   from ${Product} a                                                      // De la tabla Product
    //   LIMIT ${limit} OFFSET ${(page - 1) * limit};                           // Limitamos los registros a 10 registros por página
    // `

    const productsQuery = sql`
      select a.*,
        ( select GROUP_CONCAT(image,',') from 
	        ( select * from ${ProductImage} where productId = a.id limit 2 )
        ) as images
      from ${Product} a
      LIMIT ${ limit } OFFSET ${(page - 1) * limit};
    `
    const { rows } = await db.run(productsQuery);                         // Ejecutamos la sentencia SQL y obtenemos los registros

    const products = rows.map((product) => {                              // Iteramos sobre los registros
      return {                                                            // Creamos un objeto ProductWithImages 
        ...product,
        images: product.images ? product.images : "no-image.png"          // Si las imágenes son vacías, devolvemos un valor por defecto
      }
    }) as unknown as ProductWithImages[];

    return {
      products: products,                              // Devuelve los registros
      totalPages: totalPages,                          // Devuelve el número total de páginas
    }
  }
})