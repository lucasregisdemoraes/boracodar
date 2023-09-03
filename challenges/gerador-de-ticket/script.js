const form = document.querySelector("#user-form")
const usernameInput = document.querySelector("#github-user")
const imageElement = document.querySelector("#image-element")
const nameElement = document.querySelector("#name-element")
const errorMessageElement = document.querySelector("#error-message")
const successMessageElement = document.querySelector("#success-message")
const downloadButton = document.querySelector("#download-button")
const anotherTicketButton = document.querySelector("#another-ticket-button")

const setStatus = {
    error: () => {
        imageElement.setAttribute("src", "./assets/img-avatar.png")
        imageElement.alt = `Imagem de usuário`
        nameElement.textContent = "Seu nome aqui"
        errorMessageElement.style.display = "block"
    },
    success: (name, avatar_url, login) => {
        imageElement.setAttribute("src", avatar_url)
        imageElement.alt = `Imagem de ${name}`
        nameElement.textContent = name
        errorMessageElement.style.display = "none"

        document.body.classList.add("success")
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const username = usernameInput.value
    const apiResponse = await fetch(`https://api.github.com/users/${username}`)
    const data = await apiResponse.json()

    if (data.message === "Not Found" || username === "") {
        setStatus.error()
    } else {
        let { name, avatar_url, login } = data

        //   If user does not have a name on GitHub, set his login as name
        //   Se o usuário não tiver um nome no GitHub, define o login dele como nome
        name = name === null ? login : name

        setStatus.success(name, avatar_url, login)
    }
})

downloadButton.addEventListener("click", () => {
    alert("A função de download não esta disponível")
})

anotherTicketButton.addEventListener("click", () => {
    imageElement.setAttribute("src", "./assets/img-avatar.png")
    imageElement.alt = `Imagem de usuário`
    nameElement.textContent = "Seu nome aqui"
    document.body.classList.remove("success")
    usernameInput.value = ""
})
