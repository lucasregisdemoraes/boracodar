IMask(document.querySelector("#cc-number"), {
    mask: "0000 0000 0000 0000"
})

IMask(document.querySelector("#cc-validity"), {
    mask: "MM{/}YY",
    blocks: {
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear() + 10).slice(2),
            // validity up to 10 years from the current day
            to: String(new Date().getFullYear() + 10).slice(2)
        }
    }
})

IMask(document.querySelector("#cc-cvv"), {
    mask: "000"
})

const inputs = document.querySelectorAll("#cc-form input")

function checkInputsValidity() {
    let validInputs = 0
    inputs.forEach(input => {
        if (input.validity.valid) {
            validInputs++
        }
    })
    let allInputsAreValid = validInputs === inputs.length ? true : false
    return allInputsAreValid
}

inputs.forEach(input => {
    input.addEventListener("keyup", () => {
        const button = document.querySelector("section#button button")
        button.disabled = checkInputsValidity() ? false : true
    })
})