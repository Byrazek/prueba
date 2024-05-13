<script>
  import './styles.css'
  import '../app.css'
  import Sidebar from '../components/sidebar.svelte'
</script>

<div class="app">

    <main>
      <slot />																								
    </main>

    <Sidebar />

</div>