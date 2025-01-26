chrome.action.onClicked.addListener(async () => {
  // Open your frontend app in a new tab
  chrome.tabs.create({ url: "http://localhost:5173" });
});

chrome.action.onClicked.addListener(async () => {
  // Get the active tab URL
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const activeTabUrl = tabs[0].url;

  // Store the URL in chrome.storage for your app to access
  await chrome.storage.local.set({ activeTabUrl });
});

// Add a message listener to handle routing from your app
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "NAVIGATE") {
    // Create a new tab with the specified route
    chrome.tabs.create({ url: `http://localhost:5173/${message.route}` });
  }
});

// Add a listener for authentication completion
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "AUTH_COMPLETE") {
    // Open the popup with the /generate route
    chrome.windows.create({
      url: chrome.runtime.getURL("popup.html#/generate"),
      type: "popup",
      width: 480,
      height: 610,
    });
  }
});
