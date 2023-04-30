// get challenges from ./challenges-list.js

const challengesList = document.querySelector("#challenges")
const challengesNumberSpan = document.querySelector("#challenges-number span")

challengesList.innerHTML = challenges.map(challenge => `
    <li class="challenge">
        <a href="./challenges/${challenge.ref}">
            <img src="./previews/${challenge.ref}.jpg" alt="imagem do desafio ${challenge.name}" />
        </a>
    </li>
`).join("")

challengesNumberSpan.textContent = challenges.length