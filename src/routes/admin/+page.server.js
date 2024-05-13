import { writeFile } from 'node:fs/promises';
import { extname } from 'path';
const API_URL = "http://localhost:5038"

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const uploadedFile = formData?.get('file');
    const productName = formData?.get('name');
    const productPrice = formData?.get('price');
    const productDescription =formData?.get('description');
    const productTable = formData?.get('table');
    const filename = `src/lib/images/${crypto.randomUUID()}${extname(uploadedFile?.name)}`;

    const envio = {
      name : productName,
      table: productTable,
      price: productPrice,
      description: productDescription,
      fileName: filename
    }

    try {
      const response = await fetch(API_URL + '/api/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(envio)
      });

      if (response.ok) {
        // const data = await response.json();
        console.log('Se han enviado los datos de nuevo producto')
        await writeFile(filename, Buffer.from(await uploadedFile?.arrayBuffer()));
      } else {
        console.log("ERROR!!. No se ha podido obtener respuesta del servidor.")
      }
    } catch (error) {
      console.log(error)
      console.log("Se ha producido un error al conectarse al servidor. Intentalo de nuevo o contacta con un administrador")
    }

    return { success: true };
  }
};