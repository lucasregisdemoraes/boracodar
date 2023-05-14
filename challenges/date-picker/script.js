// ===== PICKER SWITCH
const pickerSwitchLabels = document.querySelectorAll("#picker-switch label")
const pickerSwitchInputs = document.querySelectorAll("#picker-switch input")

function switchPicker(picker) {
    const pickerElements = document.querySelectorAll(".picker")
    const selectedPickerElement = document.querySelector(`#${picker}-picker`)

    pickerElements.forEach(element => element.classList.remove("active"))
    selectedPickerElement.classList.add("active")
}

pickerSwitchInputs.forEach(input => {
    const label = document.querySelector(`#picker-switch label[for="picker-switch-${input.value}"]`)

    input.addEventListener("click", () => {
        pickerSwitchLabels.forEach(label => label.classList.remove("active"))
        label.classList.add("active")
        switchPicker(input.value)
    })
})

// ===== RENDER
// ===== Months Render
const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

function renderMonths() {
    let monthsElements = ""

    for (const month of months) {
        const activeMonth = month === months[new Date().getMonth()] ? "active" : ""
        monthsElements += `<div class="${activeMonth}">${month}</div>`
    }

    return monthsElements
}

const monthsPicker = document.querySelector("#months-picker main")
const monthsPickerYear = document.querySelector("#months-picker header > div")

monthsPicker.innerHTML = renderMonths()
monthsPickerYear.textContent = new Date().getFullYear()

// ===== Months Render
function renderDays() {
    let dayElements = ""

    let data_inicio = new Date();

    let ultimoDiaDoMes = new Date(data_inicio.getFullYear(), data_inicio.getMonth() + 1, 0);

    let acrescimo_inicio = 0;

    let acrescimo_fim = 0;

    let fim = ultimoDiaDoMes.getDate();

    let dia_semana_inicio = new Date(data_inicio.getFullYear(), data_inicio.getMonth(), 1).getDay();

    let dia_semana_fim = ultimoDiaDoMes.getDay();

    let array_calendario = [];

    acrescimo_inicio = dia_semana_inicio
    acrescimo_fim = (6 - dia_semana_fim) + 7;

    // if calendar already have 42 days not create another days row 
    if ((acrescimo_inicio - 1) + ultimoDiaDoMes.getDate() + acrescimo_fim >= 42) {
        acrescimo_fim -= 7
    }

    let ultimoDiaDoMesPassado = new Date(data_inicio.getFullYear(), data_inicio.getMonth(), 0).getDate()

    let primeiroDiaDoProximoMes = new Date(data_inicio.getFullYear(), data_inicio.getMonth() + 2, 1).getDate()

    //Montar o calendario...

    for (i = 1; i <= acrescimo_inicio; i++) {
        dayElements += `<div class="another-month">${(ultimoDiaDoMesPassado - acrescimo_inicio) + i}</div>`
    }

    for (i = 1; i <= fim; i++) {
        dayElements += `<div>${("0" + i).slice(-2)}</div>`
    }

    for (i = 0; i <= acrescimo_fim - 1; i++) {
        dayElements += `<div class="another-month">${primeiroDiaDoProximoMes + i}</div>`
    }

    let tmp = "";

    let z = 1;

    for (i = 0; i < array_calendario.length; i++) {

        tmp += array_calendario[i] + " - ";

        if (z == 7) {
            tmp = tmp.slice(0, -3);
        }

        z++;

        if (z > 7) {
            z = 1;
            tmp = "";
        }
    }

    return dayElements
}

const daysPicker = document.querySelector("#days-picker main #calendar-days")
const daysPickerDate = document.querySelector("#days-picker header div span")
let date = new Date().toLocaleString('default', { month: 'long' }) + " " + new Date().getFullYear()
date = date[0].toUpperCase() + date.substring(1)

daysPicker.innerHTML = renderDays()
daysPickerDate.textContent = date
