import { writable } from "svelte/store";

export const items = writable({});

let $items;
items.subscribe((value) => {
  $items = value;
});

window.addEventListener("fetchItems", async () => {
  // chrome.storage.local.get("items").then((data) => {
  //   debugger;
  // });
  const data = (await chrome.storage.local.get("items")) || {};
  items.set(data.items);
});

window.dispatchEvent(new Event("fetchItems"));

window.addEventListener("deleteItem", async (e) => {
  // const data = (await chrome.storage.local.get("items")) || {};
  // delete data.items[e.detail];
  // await chrome.storage.local.set({ items: data.items });
  // window.dispatchEvent(new CustomEvent("fetchItems"));

  delete $items[e.detail];
  items.set($items);
  await chrome.storage.local.set({ items: $items });
});

window.addEventListener("setItem", async (e) => {
  $items[e.detail.key] = e.detail;
  items.set($items);
  await chrome.storage.local.set({ items: $items });
});

export default { items };
