<script>
	// @ts-nocheck
  import Layout from '../layout.svelte'
	import { onMount } from "svelte";
  let API_URL = "http://localhost:5038/"
  let bebes = []

  function babys() {
    fetch(API_URL + "api/babys")
    .then(response=>response.json())
    .then(data=>{
      bebes = data
    })
  }
  onMount(async()=>{
    babys()
  })
</script>

<svelte:head>
	<title>Babys</title>
	<meta name="description" content="Svelte" />
</svelte:head>

<Layout>
  <h1 class="text-3xl text-center mt-16">Productos para Bebés</h1>

<!-- Productos para bebes -->
<div class="bg-white">
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

      {#each bebes as product}
        <a href={`/bebes/${product._id}`} class="group">
					<div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
						<img src="/src/lib/images/{product.imgURL}" alt="" class="h-full w-full object-cover object-center group-hover:opacity-75">
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
</style>
