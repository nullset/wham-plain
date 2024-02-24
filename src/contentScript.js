function changeFavicon(link) {
  let $favicon =
    document.querySelector('link[rel="icon"]') ||
    document.createElement("link");
  $favicon.rel = "icon";
  $favicon.href = link;
  document.head.appendChild($favicon);
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

  if (icon) changeFavicon(icon);
  if (customCSS) applyCustomCSS(customCSS);
  if (customJS) applyCustomJS(customJS);
}

matchUrl();
