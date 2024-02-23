console.log("background.js is running...");

// import { items } from "./store";

// let $items;
// items.subscribe((value) => {
//   $items = value;
//   console.log("items", $items);
//   debugger;
// });

// // window.addEventListener("fetchItems", async () => {
// //   const data = (await chrome.storage.local.get(["items"])) || {};
// //   items.set(data.items);
// // });

// // window.dispatchEvent(new Event("fetchItems"));

// // window.addEventListener("deleteItem", async (e) => {
// //   // const data = (await chrome.storage.local.get("items")) || {};
// //   // delete data.items[e.detail];
// //   // await chrome.storage.local.set({ items: data.items });
// //   // window.dispatchEvent(new CustomEvent("fetchItems"));

// //   delete $items[e.detail];
// //   items.set($items);
// //   await chrome.storage.local.set({ items: $items });
// // });

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  // debugger;
  // console.log("background.js received a message!", {
  //   message,
  //   sender,
  //   sendResponse,
  // });

  const key = message.key || message;
  const data = message.data;

  $items ||= {};
  console.log(key, data);

  // switch (key) {
  //   case "fetchItems":
  //     const storageDate = (await chrome.storage.local.get(["items"])) || {};
  //     items.set(storageDate.items);
  //     debugger;
  //     break;

  //   case "deleteItem":
  //     delete $items[data];
  //     items.set($items);
  //     console.log($items);
  //     await chrome.storage.local.set({ items: $items });
  //     debugger;
  //     break;

  //   case "setItem":
  //     $items[data.key] = data;
  //     items.set($items);
  //     debugger;
  //     await chrome.storage.local.set({ items: $items });
  //     chrome.runtime.sendMessage("fetchItems");
  //     break;

  //   default:
  //     break;
  // }

  // execute(message, sender, sendResponse);
});
