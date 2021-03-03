// Testing markdown
document.getElementById("preview").innerHTML = marked(
  "# Marked in browser\n\nRendered by **marked**."
);

//update markdown as user types
const input = document.getElementById("editor");
const output = document.getElementById("preview");
input.addEventListener("input", updateMarkdown);

function updateMarkdown(e) {
  output.innerHTML = marked(e.target.value);
}

//bool for checking if editor is expanded, for click function
let editorExpanded = false;
let editor = document.getElementById("editorDiv");

// listening for click on expand/shrink editor button
document
  .getElementById("expandEditorBtn")
  .addEventListener("click", expandEditor);

function expandEditor() {
  if (editorExpanded) {
    shrinkEditor();
    return;
  }

  // adding .larger-editor class to editorDiv
  //TODO: move this variable out of function
  editor.classList.remove("smaller-editor");
  editor.classList.add("larger-editor");

  //expanding textarea also
  let textarea = document.getElementById("editor");
  textarea.classList.remove("smaller-textarea");
  textarea.classList.add("larger-textarea");

  let img = document.getElementById("editorImg");
  //changing image in button to shrink img
  document.getElementById("editorImg").src = "./assets/images/shrink-icon.png";

  editorExpanded = true;
}

function shrinkEditor() {
  // adding .smaller-editor class to editorDiv
  editor.classList.remove("larger-editor");
  editor.classList.add("smaller-editor");

  //shrinking textarea also
  let textarea = document.getElementById("editor");
  textarea.classList.remove("larger-textarea");
  textarea.classList.add("smaller-textarea");

  //changing image in button to expand img
  document.getElementById("editorImg").src = "./assets/images/expand-icon.png";

  editorExpanded = false;
}

let previewerExpanded = false;
let previewer = document.getElementById("previewDiv");
let previewTextDiv = document.getElementById("preview");

// listening for click on expand/shrink previewer button
document
  .getElementById("expandPreviewerBtn")
  .addEventListener("click", expandPreviewer);

function expandPreviewer() {
  if (previewerExpanded) {
    shrinkPreviewer();
    return;
  }

  //main div
  previewer.classList.remove("smaller-previewer");
  previewer.classList.add("larger-previewer");

  //div containing text
  previewTextDiv.classList.remove("smaller-preview-div");
  previewTextDiv.classList.add("larger-preview-div");

  document.getElementById("previewerImg").src =
    "./assets/images/shrink-icon.png";

  previewerExpanded = true;
}

function shrinkPreviewer() {
  //main div
  previewer.classList.remove("larger-previewer");
  previewer.classList.add("smaller-previewer");

  //div containing text
  previewTextDiv.classList.remove("larger-preview-div");
  previewTextDiv.classList.add("smaller-preview-div");

  document.getElementById("previewerImg").src =
    "./assets/images/expand-icon.png";

  previewerExpanded = false;
}
