const exif = require("exif-js");

function handleFileSelect(e) {
  removeOutputContent();

  const files = e.target.files;
  for (let i = 0, f; (f = files[i]); i++) {
    if (!f.type.match("image.*")) {
      continue;
    }
    displayInfo(f);
  }
}

function removeOutputContent() {
  const output = document.getElementById("output");
  while (output.firstChild) {
    output.firstChild.remove();
  }
}

function displayInfo(f) {
  const reader = new FileReader();
  reader.onload = (function(file) {
    return function(e) {
      displayThumbnail(e.target.result);
      exif.getData(f, function() {
        displayTags(exif.getAllTags(this));
      });
    };
  })(f);
  reader.readAsDataURL(f);
}

function displayThumbnail(result) {
  const span = document.createElement("span");
  const img = document.createElement("img");
  img.src = result;
  span.append(img);
  document.getElementById("output").insertBefore(span, null);
}

function displayTags(tags) {
  const output = document.getElementById("output");
  const dl = document.createElement("dl");
  Object.keys(tags).forEach(k => {
    if (typeof tags[k] !== "object") {
      const dt = document.createElement("dt");
      dt.innerText = k;
      const dd = document.createElement("dd");
      dd.innerText = tags[k];
      dl.append(dt);
      dl.append(dd);
    }
  });
  output.append(dl);
}

const input = document.getElementById("files");
input.addEventListener("change", handleFileSelect, false);
