browser.runtime.onInstalled.addListener((()=>{browser.contextMenus.create({id:"marginalia-add-note",title:"Add Marginalia Note",contexts:["selection"]})})),browser.contextMenus.onClicked.addListener(((e,n)=>{"marginalia-add-note"===e.menuItemId&&console.log("Time to add a note!")}));