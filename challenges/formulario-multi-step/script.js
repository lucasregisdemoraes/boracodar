const form = document.getElementById("multi-step-form")
const progressSteps = document.querySelectorAll("#steps-progress .step")
const formSteps = document.querySelectorAll("form .form-step")

let currentStep = 0

form.addEventListener("click", e => {
    if (!e.target.matches("[data-action]")) {
        return
    }

    const actions = {
        next() {
            if (!isValidInputs()) {
                return
            }
            currentStep++
        },
        prev() {
            currentStep--
        }
    }
    const action = e.target.dataset.action
    actions[action]()
    updateActiveStep()
    updateProgressStep()
})

form.addEventListener("submit", e => {
    e.preventDefault()
    const data = new FormData(form)
    alert(`Obrigado ${data.get("name")}`)
})

// UPDATE STEPS
function updateActiveStep() {
    formSteps.forEach(step => step.classList.remove("active"))
    formSteps[currentStep].classList.add("active")
}

function updateProgressStep() {
    progressSteps.forEach((step, index) => {
        step.classList.remove("select")
        step.classList.remove("complete")

        if (index < currentStep + 1) {
            step.classList.add("select")
        }

        if (index < currentStep) {
            step.classList.add("complete")
        }
    })
}

function isValidInputs() {
    const currentFormStep = formSteps[currentStep]
    const formFields = [...currentFormStep.querySelectorAll('input'), ...currentFormStep.querySelectorAll('textarea')]

    return formFields.every(input => input.reportValidity())
}

updateActiveStep()
updateProgressStep()

formSteps.forEach(formStep => {
    function addHide() {
        formStep.classList.add("hide")
    }

    formStep.addEventListener("animationend", () => {
        addHide()
        formSteps[currentStep].classList.remove("hide")
    })
})