browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "show-note-popup") {
      createNotePopup(request.selectedText);
    }
});

function createNotePopup(selectedText) {
  console.log("Creating note...");
  const popup = document.createElement("div");
  popup.className = "marginalia-note-popup";
  popup.innerHTML = `
    <textarea id="note-text" placeholder="Type your note here...">${selectedText}</textarea>
    <button id="save-note">Save Note</button>
  `;
  
  // Get the selection range
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  
  // Create a new range for the popup
  const popupRange = document.createRange();
  popupRange.setStart(range.startContainer, range.startOffset);
  popupRange.setEnd(range.startContainer, range.startOffset);
  
  // Insert the popup at the start of the selection
  popupRange.insertNode(popup);
  
  const noteText = popup.querySelector("#note-text");
  const saveNoteButton = popup.querySelector("#save-note");
  
  saveNoteButton.addEventListener("click", () => {
    const note = noteText.value.trim();
    console.log(`Note: ${note}`);
    // TODO: Save the note to storage
    popup.remove();
  });
}