<script>
  import Layout from '../../layoutAdmin.svelte'
  async function logout() {
    window.location.href = '/logout'
  }
</script>

<Layout>
  <h1 class="text-center">Pagina de administracion de tu perfil</h1>
  <form on:submit={logout} class="flex justify-center">
    <input type="submit" value="borrar" class="bg-red-600">
  </form>
</Layout>