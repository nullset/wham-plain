console.log("contentScript.js loaded!");

function changeFavicon(link) {
  let $favicon =
    document.querySelector('link[rel="icon"]') ||
    document.createElement("link");
  $favicon.rel = "icon";
  $favicon.href = link;
  document.head.appendChild($favicon);
}

async function matchUrl() {
  const href = location.href;

  let { items } = await chrome.storage.local.get("items");

  if (!items) return;

  Object.values(items).forEach((item) => {
    const url = item.url;
    const urlIsRegex = Boolean(Number(item.urlIsRegex));
    debugger;

    if (urlIsRegex) {
      const regex = new RegExp(url);
      if (regex.test(href)) {
        changeFavicon(item.icon);
      }
    } else {
      if (href.startsWith(url)) {
        changeFavicon(item.icon);
      }
    }
  });
}

matchUrl();

// chrome.runtime.sendMessage("get-user-data", (response) => {
//   debugger;
//   // 3. Got an asynchronous response with the data from the service worker
//   console.log("received user data", response);
// });
