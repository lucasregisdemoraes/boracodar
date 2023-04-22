const fileInput = document.querySelector("#import input[type='file']")
const importDiv = document.querySelector("#import")

fileInput.addEventListener("dragover", () => {
    importDiv.classList.add("drag-over")
})

fileInput.addEventListener("dragleave", () => {
    importDiv.classList.remove("drag-over")
})