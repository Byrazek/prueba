// Importa todas las imágenes de la carpeta 'imagenes' y devuelve un objeto con los nombres de las imágenes como claves y las rutas de importación como valores
export default async function importAllImages() {
  const images = {};
  const imageContext = import.meta.glob('../../static/*.{png,jpg,jpeg,svg,webp}');
  const imagePaths = await Promise.all(Object.values(imageContext).map(importImage => importImage()));
  Object.keys(imageContext).forEach((key, index) => {
    const imageName = key.split('/').pop().split('.')[0];
    images[imageName] = imagePaths[index].default;
  });
  return images;
}