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

// chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
//   debugger;
//   // console.log("background.js received a message!", {
//   //   message,
//   //   sender,
//   //   sendResponse,
//   // });
//   // const key = message.key || message;
//   // const data = message.data;
//   // $items ||= {};
//   // console.log(key, data);
//   // switch (key) {
//   //   case "fetchItems":
//   //     const storageDate = (await chrome.storage.local.get(["items"])) || {};
//   //     items.set(storageDate.items);
//   //     debugger;
//   //     break;
//   //   case "deleteItem":
//   //     delete $items[data];
//   //     items.set($items);
//   //     console.log($items);
//   //     await chrome.storage.local.set({ items: $items });
//   //     debugger;
//   //     break;
//   //   case "setItem":
//   //     $items[data.key] = data;
//   //     items.set($items);
//   //     debugger;
//   //     await chrome.storage.local.set({ items: $items });
//   //     chrome.runtime.sendMessage("fetchItems");
//   //     break;
//   //   default:
//   //     break;
//   // }
//   // execute(message, sender, sendResponse);
// });

// chrome.webNavigation.onCompleted.addListener(
//   function (details) {
//     debugger;
// //     chrome.scripting.executeScript({
// //       target: { tabId: details.tabId },
// //       files: ["script.js"],
// //     });
// //   },
// //   { url: [{ urlMatches: "<all_urls>" }]
//   }
// );

// ------------------------------------

function changeFavicon(link) {
  debugger;
  let $favicon =
    document.querySelector('link[rel="icon"]') ||
    document.createElement("link");
  $favicon.rel = "icon";
  $favicon.href = link;
  document.head.appendChild($favicon);
  debugger;
}

function applyCustomCSS(css) {
  const $style = document.createElement("style");
  $style.textContent = css;
  document.head.appendChild($style);
}

function applyCustomJS(js) {
  const $script = document.createElement("script");
  $script.textContent = `(function() {${js}})()`;
  document.body.appendChild($script);
}

async function matchUrl() {
  const href = location.href;
  const { items } = await chrome.storage.local.get("items");

  if (!items) return;

  let matchSpecificity = 0;
  let matchKey = 0;
  let icon;
  let customCSS;
  let customJS;

  Object.values(items).forEach((item) => {
    const regex = new RegExp(item.url);
    const match = href.match(regex);
    if (!match) return;

    // Specificity is the length of the matched string. This is a simple way to determine which match is the most specific,
    // and hence which favicon to use.
    const specificity = match[0].length;

    if (specificity < matchSpecificity) return;
    if (item.key < matchKey) return;

    matchSpecificity = specificity;
    matchKey = item.key;
    icon = item.icon;
    customCSS = item.customCSS;
    customJS = item.customJS;
  });

  // if (icon) changeFavicon(icon);
  // if (customCSS) applyCustomCSS(customCSS);
  // if (customJS) applyCustomJS(customJS);

  if (icon) {
    let $favicon =
      document.querySelector('link[rel="icon"]') ||
      document.createElement("link");
    $favicon.rel = "icon";
    $favicon.href = icon;
    document.head.appendChild($favicon);
  }

  if (customJS) {
    const $script = document.createElement("script");
    $script.textContent = customJS;
    document.body.appendChild($script);

    // const fn = new Function(customJS);
    // fn();

    // console.log(customJS);
    // const foo = new Function("alert()");
    // foo();
  }
}

chrome.webNavigation.onCompleted.addListener((details) => {
  console.log("onCompleted", details);

  chrome.scripting.executeScript({
    target: { tabId: details.tabId },
    function: matchUrl,
  });
});
