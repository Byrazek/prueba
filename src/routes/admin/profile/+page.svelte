<!-- uploadForm.svelte -->

<script>
  import {API_URL} from '/src/config.js'
  let file

  async function handleFile(event) {
    console.log(event.target.files)
    if (event.target.files && event.target.files.length > 0) {
      file = event.target.files[0];
    } else {
      console.error('No se seleccionó ningún archivo');
    }
  }



  async function handleFileUpload(event) {

    console.log(file)
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', 'camisa verde')
    try { 
      const response = await fetch(API_URL + '/upload', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        console.log('Archivo subido con éxito.');
      } else {
        console.error('Error al subir el archivo.');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  }
</script>

<form on:submit={handleFileUpload} enctype="multipart/form-data">
  <input type="file" name="image" accept="image/*" on:change={handleFile}>
  <button type="submit">Subir imagen</button>
</form>
