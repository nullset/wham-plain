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
  const { items } = await chrome.storage.local.get("items");

  if (!items) return;

  let matchSpecificity = 0;
  let icon;

  Object.values(items).forEach((item) => {
    const regex = new RegExp(item.url);
    const match = href.match(regex);
    if (!match) return;

    // Specificity is the length of the matched string. This is a simple way to determine which match is the most specific,
    // and hence which favicon to use.
    const specificity = match[0].length;

    if (specificity < matchSpecificity) return;

    matchSpecificity = specificity;
    icon = item.icon;
  });

  if (icon) changeFavicon(icon);
}

matchUrl();
