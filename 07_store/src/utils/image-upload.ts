import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET
});


export class ImageUpload {

  static async upload(file: File) {

    const buffer = await file.arrayBuffer();                    // Definimos un buffer basado en la imagen
    const base64Image = Buffer.from(buffer).toString('base64')  // Ese buffer se convierte a una cadena en formato base64 
    const imageType = file.type.split('/')[1] // image/png      // Luego, se extrae el tipo de imagen 

    const resp = await cloudinary.uploader.upload(              // Finalmente, se sube la imagen a Cloudinary como una cadena en formato Data URI
      `data:image/${imageType};base64,${base64Image}`           // que incluye el tipo de imagen y los datos codificados en base64.
    )

    console.log(resp);

    return resp.secure_url;                                     // Devolvemos la URL de la imagen subida
  }

  static async delete(image: string) {

    try {
      const imageName = image.split('/').pop() ?? "";             // Extraemos el último elemento de la cadena, que es el id de la imagen
    
      const imageId = imageName.split(".")[0];                    // El id contiene la extensión, por lo que extraemos el id sin la extensión
    
      const resp = await cloudinary.uploader.destroy(             // Finalmente, se elimina la imagen de Cloudinary
        imageId
      )

      return true;

    } catch (error) {
      console.log(error);
      return false;
    }

  }
}