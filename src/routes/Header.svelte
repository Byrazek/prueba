<script>
	import { onMount } from "svelte";
  let API_URL = "http://localhost:5038"
	var logged = false

  async function usuarios() {
		fetch(API_URL + '/find/users')
		.then(response => response.json())
		.then(data => {
			console.log("¿Usuario autenticado?", data.loggedUser);
			logged = data.loggedUser
		})
		.catch(error => {
			logged = false
			console.error('Error al obtener el estado de autenticación:', error);
		});
  }
  onMount(async()=>{
    usuarios()
  })
	async function logout() {
    window.location.href = '/logout'
  }
	async function admin() {
    window.location.href = '/admin'
  }
</script>

<header class="bg-transparent">
	<!-- Buttons -->
	<nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
		<div class="flex lg:flex-1">
			<a href="/" class="-m-1.5 p-1.5">
				<span class="sr-only">Nijolinijolan</span>
				<img class="h-8 w-auto" src="https://i.postimg.cc/vmWKf5Pn/logo.jpg" alt="logo">
			</a>
		</div>
		<div class="flex lg:hidden">
			<button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
				<span class="sr-only">Open main menu</span>
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
				</svg>
			</button>
		</div>
		<div class="hidden lg:flex lg:gap-x-12">
			<a href="/bebes" class="text-sm font-semibold leading-6 text-gray-900">Bebés</a>
			<a href="/chico" class="text-sm font-semibold leading-6 text-gray-900">Chico</a>
			<a href="/chica" class="text-sm font-semibold leading-6 text-gray-900">Chica</a>
			<a href="/contacto" class="text-sm font-semibold leading-6 text-gray-900">Contacto</a>
		</div>
		<div class="hidden lg:flex lg:flex-1 lg:justify-end">
			{#if logged === true}
				<a href="/#" on:click={admin} class="text-sm font-semibold leading-6 text-gray-900 mr-10">&#9881</a>
				<a href="/#" on:click={logout} class="text-sm font-semibold leading-6 text-gray-900">Log out <span aria-hidden="true">&rarr;</span></a>
			{:else}
				<a href="/login" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
			{/if}
		</div>
	</nav>

<!-- Mobile menu, show/hide based on menu open state. -->
<div class="lg:hidden" role="dialog" aria-modal="true">
	<!-- Background backdrop, show/hide based on slide-over state. -->
	<div class="fixed inset-0 z-10"></div>
	<div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
		<div class="flex items-center justify-between">
			<a href="/" class="-m-1.5 p-1.5">
				<span class="sr-only">nijolinnijolan</span>
				<img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
			</a>
			<button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
				<span class="sr-only">Close menu</span>
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
		<div class="mt-6 flow-root">
			<div class="-my-6 divide-y divide-gray-500/10">
				<div class="space-y-2 py-6">¡
					<a href="/bebes" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Bebes</a>
					<a href="/chico" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Chico</a>
					<a href="/chica" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Chica</a>
					<a href="/contacto" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Contacto</a>
				</div>
				<div class="py-6">
					{#if logged === true}
						<a href="/logout" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log out</a>
					{:else}
						<a href="/login" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log j</a>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
</header>

<style>
</style>
