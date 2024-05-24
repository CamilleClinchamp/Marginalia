// Create a context menu item
browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "marginalia-add-note",
    title: "Add Marginalia Note",
    contexts: ["selection"]
  });
});

// Add a listener for context menu item clicks
browser.contextMenus.onClicked.addListener((info, tab) => {
  try {
    browser.scripting.insertCSS({
      target: {
        tabId: tab.id,
      },
      files: ["style.css"],
    });
  } catch (err) {
    console.error(`failed to insert CSS: ${err}`);
  }
  
  if (info.menuItemId === "marginalia-add-note") {
    const selectedText = info.selectionText;
    browser.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['content.js']
    }).then(() => {
      browser.tabs.sendMessage(tab.id, { action: "show-note-popup", selectedText });
    }).catch((error) => {
      console.error("Error injecting content script:", error);
    });
  }
});