


import type { CartItem } from "@/interfaces";
import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { db, eq, inArray, Product, ProductImage } from "astro:db";

export const loadProductsFromCart = defineAction({
  accept: 'json',
  input: z.object({
    cookies: z.string()
  }),
  handler: async ( { cookies } ) => {
    
    const cart = JSON.parse(cookies) as CartItem[];
    if( cart.length === 0 ) {
      return []
    }

    const productsIds = cart.map(item => item.productId); // Array de ids de productos del carrito

    const dbProducts = await db                           // Obtenemos los productos de la base de datos con sus imágenes segun los ids del carrito
      .select()
      .from(Product)
      .innerJoin( ProductImage, eq(Product.id, ProductImage.productId) )
      .where( inArray(Product.id, productsIds) )
    
    return cart.map(item => {
      const dbProduct = dbProducts.find(p => p.Product.id === item.productId); // Encontramos cada producto de la bd este o no repetido
      if(!dbProduct){
        throw new Error(`Producto no encontrado con id ${item.productId}`);
      }

      const { title, price, slug } = dbProduct.Product;    // Por cada producto obtenemos sus datos
      const image = dbProduct.ProductImage.image           // También obtenemos la imagen 
    
      return {                                             // Retornamos el producto con sus datos
        productId: item.productId,
        title,
        size: item.size,
        quantity: item.quantity,
        image: image.startsWith('http') 
          ? image 
          : `${import.meta.env.PUBLIC_URL}/images/products/${image}`,
        price: price,
        slug: slug
      }
    })
  }
})