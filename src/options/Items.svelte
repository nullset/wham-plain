<script lang="ts">
  import {items} from '../store';
  import Item from './Item.svelte';


  async function addNewItem() {
    const key = `${Date.now()}`;
    $items[key] = {key};
  }

  // window.dispatchEvent(new Event("fetchItems"));
</script>

{#each Object.values($items) as item, index}
  <Item {...item} open={Object.keys(item).length === 1} />
{/each}

<button type="button" on:click={addNewItem}>Add new</button>

{console.log($items)}
<style scoped>


</style>
