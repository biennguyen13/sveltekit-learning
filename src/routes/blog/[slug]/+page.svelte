<script>
  export const data = { tittle: "Test slug" }
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="Slug Blog this app" />
</svelte:head>

<div class="text-column">
  <h1>Slug Blog this app - {data.tittle}</h1>
</div>
