import type { CartItem } from "@/interfaces"
import Cookies from "js-cookie";



export class CartCookiesClient {

  static getCart():CartItem[]{
    return JSON.parse(Cookies.get('cart') ?? '[]')  // Productos del carrito
  }
  
  static addItem(cartItem:CartItem): CartItem[]{    
    
    const cart = CartCookiesClient.getCart()
    const existsItemInCart = cart.find(             // Comprobamos si el producto que se añade(cartItem) ya existe en el carrito
      (item) => item.productId === cartItem.productId && item.size === cartItem.size
    )

    if(existsItemInCart){                           // Si existe, actualizamos la cantidad de productos
      existsItemInCart.quantity += cartItem.quantity
    }else{
      cart.push(cartItem)                           // Si no existe, añadimos el producto al carrito
    }

    Cookies.set('cart', JSON.stringify(cart))       // Actualizamos el cookie con el nuevo carrito

    return cart
  }

  static removeItem( productId:string, size:string): CartItem[]{

    const cart = CartCookiesClient.getCart()

    const updatedCart = cart.filter(
      (item) => !(item.productId === productId && item.size === size)  // Filtramos los productos que coincidan con el producto que se quiere eliminar
    )
console.log(updatedCart);
    Cookies.set('cart', JSON.stringify(updatedCart))                  // Actualizamos el cookie con el nuevo carrito
    
    return updatedCart;
  }
}