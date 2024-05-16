<script>

  import Layout from '../layout.svelte'
  import { onMount } from "svelte";
  import { API_URL } from '/src/config.js'
  // import image from '../../../static/logo.jpeg'
  // import importAllImages from '../../utils/imageRead';
  // let images = {};

  let chica = []

  function api() {
    fetch(API_URL + "/api/chica")
    .then(response=>response.json())
    .then(data=>{
      chica = data
    })
  }
  onMount(async()=>{
    api()
  })
</script>

<Layout>
  <h1 class="text-3xl text-center mt-16">Productos para Chica</h1>
<!-- Productos para chica -->
<div class="bg-white">
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {#each chica as product}
            <a href={`/chica/${product._id}`}  class="group">
              <div class="aspect-h-1 aspect-w-1 rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7" style="width: 250px; height: 350px;">
                <img src="/src/lib/images/{product.imgURL}" alt="{product.imgURL}" class="h-full w-full rounded-lg object-cover object-center group-hover:opacity-75">
              </div>
              <h3 class="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p class="mt-1 text-lg font-medium text-gray-900">{product.price}€</p>
            </a>
      {/each}

    </div>
  </div>
</div>
</Layout>

<style>
  img {
    width: 100%; 
    height: 100%;
  }
</style>