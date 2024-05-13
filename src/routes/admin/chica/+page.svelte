<script>
  // @ts-nocheck
  
    import Layout from '../../layoutAdmin.svelte'
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { onMount } from "svelte";
    let API_URL = "http://localhost:5038/"
    let bebes = []
  
    function babys() {
      fetch(API_URL + "api/chica")
      .then(response=>response.json())
      .then(data=>{
        bebes = data
      })
    }
    onMount(async()=>{
      babys()
    })
  
    async function deleteProduct(id) {
      try {
        const table = 'chica'
        let ruta = 'api/delete?id=' + id + '&table=' + table;
        const res = await fetch(API_URL + ruta, {
          method: 'DELETE'
        });
        if (res.ok) {
          location.reload()
          console.log('response OK')
        }
      } catch (error) {
        console.log(error)
        console.log("Se ha producido un error al conectarse al servidor. Intentalo de nuevo o contacta con un administrador")
      }
    }
  </script>
  
  <Layout>
    <h1 class="text-center text-3xl text-gray-600">Productos de Chica</h1>
    <div class="cuadrado">
      <Table hoverable={true}>
        <TableHead>
          <TableHeadCell>Nombre del producto</TableHeadCell>
          <TableHeadCell>Precio</TableHeadCell>
          <TableHeadCell>Descripción</TableHeadCell>
          <TableHeadCell>
            <span class="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody tableBodyClass="divide-y">
          {#each bebes as product}
          <TableBodyRow>
              <TableBodyCell>{product.name}</TableBodyCell>
              <TableBodyCell>{product.price}€</TableBodyCell>
              <TableBodyCell>{product.description}</TableBodyCell>
              <TableBodyCell>
                <button on:click={deleteProduct(product._id)} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Borrar</button>
              </TableBodyCell>
          </TableBodyRow>
          {/each}
        </TableBody>
      </Table>
    </div>
  </Layout>
  
  <style>
    h1 {
      margin-top: 15vh;
      margin-bottom: 15vh;
    }
    .cuadrado {
      width: 65%;
      margin-left: 22.5%;
    }
  </style>