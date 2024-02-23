<script lang="ts">
  import Item from './Item.svelte';

  let items = {};
  let savedItems = {};

  $: savedItemNum = Object.keys(savedItems || {}).length;
  $: itemNum = Object.keys(items || {}).length;
  $: canAddNewItem = savedItemNum === itemNum;
  
  window.addEventListener("fetchItems", async () => {
    const data = (await chrome.storage.local.get(["items"])) || {};
    savedItems = data.items;
    items = {...data.items};
  });

  window.addEventListener('deleteItem', async (e) => {
    const data = await chrome.storage.local.get('items') || {};
    delete data.items[e.detail];
    await chrome.storage.local.set({items: data.items});
    window.dispatchEvent(new CustomEvent('fetchItems'));
  })

  window.dispatchEvent(new Event("fetchItems"));

  async function addNewItem() {
    const key = crypto.randomUUID();
    items[key] = {key};
  }

</script>

{#each Object.values(items) as item, index}
  <Item {...item} open={Object.keys(item).length === 1} />
{/each}

<button type="button" on:click={addNewItem} disabled={!canAddNewItem}>Add new</button>


<style scoped>


</style>
