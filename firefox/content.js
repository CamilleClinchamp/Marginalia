const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Reenie+Beanie&display=swap';
document.head.appendChild(link);

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "show-note-popup") {
      createNotePopup(request.selectedText);
    }
});

function createNotePopup(selectedText) {
  const notePopup = document.createElement("div");
  notePopup.className = "marginalia-note-popup";
  notePopup.innerHTML = `
    <svg id="eGHI3RtKnjW1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 201" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><g transform="matrix(1.181558 0 0 1.181558-27.2337-76.7337)"><rect width="52.097357" height="52.097357" rx="0" ry="0" transform="matrix(.892094 0 0 0.892094 46.883906 86.830997)" fill="none" stroke="#47474757" stroke-width="25"/><rect width="52.097357" height="52.097357" rx="0" ry="0" transform="matrix(.892094 0 0 0.892094 46.849 166.693265)" fill="none" stroke="#47474757" stroke-width="25"/><rect width="52.097357" height="52.097357" rx="0" ry="0" transform="matrix(.892094 0 0 0.892094 126.709772 166.693265)" fill="none" stroke="#47474757" stroke-width="25"/><rect width="52.097357" height="52.097357" rx="0" ry="0" transform="matrix(.892094 0 0 0.892094 206.640356 166.693265)" fill="none" stroke="#47474757" stroke-width="25"/><rect width="52.097357" height="52.097357" rx="0" ry="0" transform="matrix(.892094 0 0 0.892094 126.744678 86.830997)" fill="none" stroke="#47474757" stroke-width="25"/><rect width="52.097357" height="52.097357" rx="0" ry="0" transform="matrix(.892094 0 0 0.892094 206.675262 86.830997)" fill="none" stroke="#47474757" stroke-width="25"/></g></svg>
    <textarea id="note-text" placeholder="Type your note here...">${selectedText}</textarea>
    <button id="save-note"></button>
  `;
  
  const noteText = notePopup.querySelector("#note-text");
  const saveNoteButton = notePopup.querySelector("#save-note");
  
  saveNoteButton.addEventListener("click", (event) => {
    const note = noteText.value.trim();
    console.log(`Note: ${note}`);
    // TODO: Save the note to storage
    notePopup.remove();
  });

  let isDragging = false;
  let startX, startY;

  // Add event listeners
  notePopup.addEventListener("mousedown", (event) => {
    if (event.target.tagName !== "TEXTAREA") {
      isDragging = true;
      startX = event.clientX;
      startY = event.clientY;
      notePopup.classList.add("dragging");
    }
    event.preventDefault();
  });

  document.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const offsetX = event.clientX - startX;
      const offsetY = event.clientY - startY;
      notePopup.style.top = `${notePopup.offsetTop + offsetY}px`;
      notePopup.style.left = `${notePopup.offsetLeft + offsetX}px`;
      startX = event.clientX;
      startY = event.clientY;
      event.preventDefault();
    }
  });

  document.addEventListener("mouseup", (event) => {
    isDragging = false;
    notePopup.classList.remove("dragging");
    event.preventDefault();
  });
  
  notePopup.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });

  // Insert the popup into the document
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const popupRange = document.createRange();
  popupRange.setStart(range.startContainer, range.startOffset);
  popupRange.setEnd(range.startContainer, range.startOffset);
  popupRange.insertNode(notePopup);
}