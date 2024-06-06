// Create a context menu item
function createContextMenu() {
  browser.contextMenus.create({
    id: "marginalia-add-note",
    title: "Add Marginalia Note",
    contexts: ["selection"]
  });
}

// Add a listener for context menu item clicks
function addContextMenuListener() {
  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "marginalia-add-note") {
      handleAddNote(info, tab);
    }
  });
}

// Handle the "Add Note" context menu item click
function handleAddNote(info, tab) {
  try {
    browser.scripting.insertCSS({
      target: {
        tabId: tab.id,
      },
      files: ["style.css"],
    });
  } catch (err) {
    console.error(`Failed to insert CSS: ${err}`);
  }

  const selectedText = info.selectionText;
  browser.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  }).then(() => {
    browser.tabs.sendMessage(tab.id, { action: "show-note-popup", selectedText });
  }).catch((error) => {
    console.error("Error injecting content script:", error);
  });
}

// Initialize the background script
function init() {
  createContextMenu();
  addContextMenuListener();
}

init();