/* Global Variables */
const textArea = document.querySelector("#input__text");
const fileName = document.querySelector("#file__name");
const ext = document.querySelector("#file__ext");
const saveBtn = document.querySelector(".btn");

saveBtn.disabled = true;

/* functions */

ext.addEventListener("change", () => {
  saveBtn.innerText = `Save as ${
    ext.options[ext.selectedIndex].text.split(" ")[0]
  } File`;
});

textArea.addEventListener("input", (e) => {
  saveBtn.style.opacity = "1";
  saveBtn.style.background = "#148c9f";
  saveBtn.disabled = false;
  if (e.target.value === "") {
    saveBtn.disabled = true;
    saveBtn.style.background = "#17A2B8";
    saveBtn.style.opacity = "0.6";
  }
});

const createTxt = (txt, Name, MIME_Type) => {
  const fileContent = [
    new Blob([txt], {
      type: MIME_Type,
    }),
  ];
  const file = new File(fileContent, Name, {
    type: MIME_Type,
  });
  return file;
};

const downloadFile = (fileContent, Name, MIME_Type) => {
  const fileURL = URL.createObjectURL(createTxt(fileContent, Name, MIME_Type));
  const anchor = document.createElement("a");
  anchor.href = fileURL;
  anchor.download = Name;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(fileURL);
};

saveBtn.addEventListener("click", () => {
  if (!saveBtn.disabled) {
    downloadFile(textArea.value, fileName.value, ext.value);
  }
});
