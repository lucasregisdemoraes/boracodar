document.querySelectorAll("img.eye").forEach(eye => {
  eye.addEventListener("click", () => togglePasswordVisibility())
})

function togglePasswordVisibility() {
  document.querySelectorAll("img.eye").forEach(eye => {
    eye.classList.toggle("hide")
  })

  const passwordInputType = document.getElementById("password").type === "password" ? "text" : "password"

  document.getElementById("password").type = passwordInputType
}