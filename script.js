// get challenges from ./challenges-list.js

const challengesList = document.querySelector("#challenges")
const challengesNumberSpan = document.querySelector("#challenges-number span")

challengesList.innerHTML = challenges.map(challenge => `
    <li class="challenge">
        <a href="./challenges/${convertNameToRef(challenge)}">
            <img src="./previews/${convertNameToRef(challenge)}.jpg" alt="imagem do desafio ${challenge.name}" />
        </a>
    </li>
`).join("")

function convertNameToRef(name) {
    name = name.toLowerCase()
    name = name.split(" ")
    name = name.join("-")
    name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    return name
}

challengesNumberSpan.textContent = challenges.length