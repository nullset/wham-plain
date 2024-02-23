console.log("contentScript.js loaded!");

chrome.runtime.sendMessage("get-user-data", (response) => {
  debugger;
  // 3. Got an asynchronous response with the data from the service worker
  console.log("received user data", response);
});
