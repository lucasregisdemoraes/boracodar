const main = document.querySelector("main")
const slider = document.querySelector("#slider")
const imageAfter = document.querySelector("#before img")

slider.addEventListener("input", e => {
    const value = e.currentTarget.value
    imageAfter.style.width = `${value}%`
    main.style.setProperty('--dragger-position', `${value}%`)
})