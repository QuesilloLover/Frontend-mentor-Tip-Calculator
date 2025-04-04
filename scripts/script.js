const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const tipPerPerson = document.getElementById("tip-amount");
const totalPerPerson = document.getElementById("total-amount");
const tips = document.querySelectorAll(".tips");
const customTip = document.querySelector(".tip-custom");
const resetButton = document.querySelector(".reset");
const error = document.querySelector(".error");

billInput.addEventListener("input", billInputFun);
peopleInput.addEventListener("input", peopleInputFun);
customTip.addEventListener("input", tipInputFun);
resetButton.addEventListener("click", reset);
tips.forEach(function (val) {
    val.addEventListener("click", handleClick);
})

billInput.value = '0.0';
peopleInput.value = '1';
tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);

let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.15;

function billInputFun() {
    billValue = parseFloat(billInput.value);
    if (isNaN(billValue) || billValue <= 0) {
        billValue = 0.0;
        billInput.value = '';
    }
    calculateTip();
}

function peopleInputFun() {
    peopleValue = parseInt(peopleInput.value);
    if (isNaN(peopleValue) || peopleValue <= 0) {
        peopleValue = 1;
        peopleInput.value = '';
        error.style.display = "flex";
        peopleInput.style.border = "thick solid red";
    } else {
        error.style.display = "none";
        peopleInput.style.border = "none";
        calculateTip();
    }
}


function tipInputFun() {
    tipValue = parseFloat(customTip.value) / 100;
    tips.forEach(function (val) {
        val.classList.remove("active-tip");
    });
    calculateTip();
}

function handleClick() {
    tips.forEach(function (val) {
        val.classList.remove("active-tip");
        if (event.target.innerHTML == val.innerHTML) {
            val.classList.add("active-tip");
            tipValue = parseFloat(val.innerHTML) / 100;
        }
    });
    calculateTip();
}

function calculateTip() {
    if (peopleValue >= 1) {
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = (billValue + billValue * tipValue) / peopleValue;
        tipPerPerson.innerHTML = "$" + tipAmount.toFixed(2);
        totalPerPerson.innerHTML = "$" + total.toFixed(2);
    }
}

function reset() {
    billInput.value = '0.0';
    billInputFun();
    peopleInput.value = '1';
    peopleInputFun();
    customTip.value = '';
}