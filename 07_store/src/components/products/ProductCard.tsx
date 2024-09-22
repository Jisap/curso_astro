import type { ProductWithImages } from "@/interfaces";
import { useState } from "react";


interface Props {
  product: ProductWithImages;
}

export const ProductCard = ({ product }: Props) => {            // El product tiene un string de imagenes separadas por comas

  const images = product.images.split(',').map((img) => {       // Convierte la cadena de imagenes en un array de strings
    return img.startsWith('http')                               // Si la imagen comienza con http, devuelve la imagen sin cambios
      ? img 
      : `${import.meta.env.PUBLIC_URL}/images/products/${img}`; // Si no, devuelve la imagen con la ruta de la imagen en el servidor
  });

  const [currentImage, setCurrentImage] = useState(images[0]);  // El primer elemento de la imagen es el actual

  return (
    <a href={`/products/${product.slug}`}>
      <img 
        src={currentImage} 
        alt={product.title} 
        className="h-[350px] object-cover rounded-2xl shadow-md transition duration-300" 
        onMouseEnter={() => setCurrentImage(images[1] ?? images[0])}
        onMouseLeave={() => setCurrentImage(images[0] )}
      />
      <h4>{product.title}</h4>
      <p>${product.price}</p>
    </a>
  )
}

