<script>
  import Layout from './layout.svelte'
	import { onMount } from "svelte";
  import {API_URL} from '/src/config.js'
  // import logo from '/static/logo.jpeg'
  // import parallax from '/static/parallax.webp'
  // import img_bebes from '/static/bebes.jpg'
  // import img_chica from '/static/chica.jpg'
  // import img_chico from '/static/chico.jpg'
  /**
	 * @type {any[]}
	 */
  let newsletter = []

  function usuarios() {
    fetch(API_URL + "/api/newsletter")
    .then(response=>response.json())
    .then(data=>{
      newsletter = data
    })
  }
  onMount(async()=>{
    usuarios()
  })
</script>

<svelte:head>
	<title>nijolinnijolan</title>
	<meta name="description" content="Svelte" />
</svelte:head>

<Layout>
  <main>
  <img class="parallax" src="/src/lib/images/parallax.webp" alt="parallax">
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Products</h2>
      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
        <a href="/bebes" class="">
          <div class=" aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7 hover:opacity-75 hover:text-2xl  hover:text-stone-500 transition-all" style="width: 350px; height:375px;">
            <div class="flex text-center justify-center items-center w-full h-full bg-transparent">
              <img src="/src/lib/images/bebes.jpg" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-center">
              <p class="absolute flex items-center justify-center bg-white" style="border-radius: 10px; padding: 0.5% 0.5% 0.5% 0.5%;">Bebés</p>
            </div>
          </div>
        </a>
        <a href="/chico" class="">
          <div class=" aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7 hover:opacity-75 hover:text-2xl  hover:text-stone-500 transition-all" style="width: 350px; height:375px;">
            <div class="flex text-center justify-center items-center w-full h-full bg-transparent">
              <img src="/src/lib/images/chico.jpg" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-center">
              <p class="absolute flex items-center justify-center bg-white" style="border-radius: 10px; padding: 0.5% 0.5% 0.5% 0.5%;">Chico</p>
            </div>
          </div>
        </a>
        <a href="/chica" class="">
          <div class=" aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7 hover:opacity-75 hover:text-2xl  hover:text-stone-500 transition-all" style="width: 350px; height:375px;">
            <div class="flex text-center justify-center items-center w-full h-full bg-transparent">
              <img src="/src/lib/images/chica.jpg" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-center">
              <p class="absolute flex items-center justify-center bg-white" style="border-radius: 10px; padding: 0.5% 0.5% 0.5% 0.5%;">Chica</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
  
  <section class="flex flex-col justify-center items-center mt-16">
    <div class="flex">
      <div class="nc text-4xl">Nueva Coleccion 2024</div>
      <img class="ml-10 h-8 w-auto" src="/src/lib/images/logo.jpeg" alt="logo">
    </div>
    
    <div class="mt-5">Nueva selección de prendas para niños de diferentes edades está disponible online</div>
  </section>
  
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:mt-20 lg:max-w-7xl lg:px-8">
  
      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {#each newsletter as product}
            <a href={`/${product._id}`}  class="group">
              <div class="aspect-h-1 aspect-w-1 rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7" style="width: 250px; height: 350px;">
                <img src="/src/lib/images/{product.imgURL}" alt="{product.description}" class="h-full w-full rounded-lg object-cover object-center group-hover:opacity-75">
              </div>
              <h3 class="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p class="mt-1 text-lg font-medium text-gray-900">{product.price}€</p>
            </a>
      {/each}
  
      </div>
    </div>
  </div>
  <div class="flex justify-center sm:mb-32" style="width: 100%;">
    <div class="raya bg-gray-200"></div>
  </div>
  
  </main>
</Layout>

<style>
	.parallax {
    position: relative;
    width: 100%;
    height: 80vh;
    object-fit: cover;
  }
  .raya {
    height: 1px;
    width: 50%;
    border-radius: 50%;
  }
</style>
