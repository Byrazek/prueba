<!-- <script context="module">
  // Este código se ejecutará en el servidor y en el navegador
  export async function load({ fetch }) {
    // Lógica de carga de datos...
  }
</script> -->
<script>
  setTimeout(()=>{
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  },1000)
</script>

<h1 class="text-center text-3xl text-gray-400">Has cerrado sesión</h1>