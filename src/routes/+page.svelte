<script>
  import Layout from './layout.svelte'
	import { onMount } from "svelte";
  let API_URL = "http://84.120.85.204:5038"
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
  <img class="parallax" src="https://images.alphacoders.com/910/thumb-1920-910418.jpg" alt="">
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Products</h2>
      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
        <a href="/bebes" class="">
          <div class=" aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <p class="absolute flex items-center justify-center h-10 w-20 bg-white" style="border-radius: 10px; margin-top: 8%; margin-left: 7.5%;">Bebés</p>
            <img src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-center group-hover:opacity-75">
          </div>
        </a>
        <a href="/chico" class="">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-cover object-center group-hover:opacity-75">
          </div>
        </a>
        <a href="/chica" class="">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-cover object-center group-hover:opacity-75">
          </div>
        </a>
      </div>
    </div>
  </div>
  
  <section class="flex flex-col justify-center items-center mt-16">
    <div class="flex">
      <div class="nc text-4xl">Nueva Coleccion 2024</div>
      <img class="ml-10 h-8 w-auto" src="https://i.postimg.cc/vmWKf5Pn/logo.jpg" alt="">
    </div>
    
    <div class="mt-5">Nueva selección de prendas para niños de diferentes edades está disponible online</div>
  </section>
  
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:mt-20 lg:max-w-7xl lg:px-8">
  
      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {#each newsletter as product}
          <a href="/{product._id}" class="group">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img src="/src/lib/images/{product.imgURL}" alt="{product.description}" class="h-full w-full object-cover object-center group-hover:opacity-75">
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
