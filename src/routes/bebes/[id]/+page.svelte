<script>
// @ts-nocheck
  import Layout from '../../layout.svelte'
  import { onMount } from 'svelte';

  // let searchParams = {};
  let currentPath
  let currentPathPart
  let API_URL = "http://localhost:5038"
  let product = []
  let source

  // Usa onMount para ejecutar el código después de que el componente se monta
  onMount(() => {
    // Obtén los parámetros de búsqueda de la URL
    const params = new URLSearchParams(window.location.search);
    currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    // Obtiene la última parte de la ruta
    currentPathPart = pathParts[pathParts.length - 1];
    busqueda(currentPathPart)
    // Busqueda de parametros en la ruta
    // for (const [key, value] of params) {
    //   searchParams[key] = value;
    // }
  });

  /**
	 * @param {string} param
	 */
  async function busqueda(param) {
    try {
      const res = await fetch(API_URL + '/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: param, table: 'bebes'})
      });
      if (!res.ok) {
        console.log('Se ha producido un error')
      } else {
        product = await res.json()
        // console.log(product)
        source = '/src/lib/images/' + product.imgURL
      }
    } catch (error) {
      console.log(error)
      console.log('Se ha producido un error al conectarse con el servidor. Intentalo de nuevo mas tarde o contacta con administración')
    }
  }
</script>
<Layout>
<section class="container mx-auto my-36 px-4 md:px-6 py-8">
  <div class="grid lg:grid-cols-2 gap-6 items-start">
    <div>
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src="{source}" alt="" class="rounded-lg object-cover w-full aspect-square" style="width: 600px; height: 600px;"/>
    </div>
    <div>
      <h1 class="text-3xl font-bold">{product.name}</h1>
      <p class="mt-2 text-zinc-500 dark:text-zinc-400">
        {product.description}
      </p>
      <h2 class="text-4xl font-bold mt-6">€{product.price}</h2>
      <div class="mt-8">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
        <button
          type="button"
          role="combobox"
          aria-controls="radix-:Rlmlafnnja:"
          aria-expanded="false"
          aria-autocomplete="none"
          dir="ltr"
          data-state="closed"
          data-placeholder=""
          class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span style="pointer-events:none">Select a color</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4 opacity-50"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
        <select
          aria-hidden="true"
          tabindex="-1"
          style="position:absolute;border:0;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;word-wrap:normal"
        >
          <option value=""></option>
        </select>
      </div>
      <div class="mt-4">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
        <input
          type="number"
          min="1"
          max="100"
          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-8">
        Añadir al carrito
      </button>
    </div>
  </div>
</section>
</Layout>
