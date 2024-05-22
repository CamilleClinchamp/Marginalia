browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
      id: "marginalia-add-note",
      title: "Add Marginalia Note",
      contexts: ["selection"]
    });
  });
  
  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "marginalia-add-note") {
      console.log("Time to add a note!");
    }
  });