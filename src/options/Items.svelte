<script lang="ts">
  import { items } from '../store';
  import Item from './Item.svelte';

  console.log($items); // Should log {} initially


  // Function to add a new item
  async function addNewItem() {
    const key = `${Date.now()}`;
    items.update(currentItems => {
      const newItem = { [key]: { key: key } }; // Correctly creating a new item
      return { ...currentItems, ...newItem }; // Merging the new item with existing items
    });
  }
</script>

<!-- Updated {#each} loop with a check for $items -->
{#if $items} <!-- Check if $items is not null or undefined -->
  {#each Object.values($items) as item (item.key)}
    <Item {...item} open={Object.keys(item).length === 1} />
  {/each}
{/if}

<button type="button" on:click={addNewItem}>Add new</button>