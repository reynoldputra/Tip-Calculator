const bill = document.getElementById('input-bill');
const tipButton = document.querySelectorAll('.tip');
const customInput = document.getElementById('inputTip');
const peopleInput = document.getElementById('people-num-input');
const errorPeopleInput = document.querySelector('.zero-people');
const tipAmountResult = document.querySelector('.tip-amount-screen');
const totalResult = document.querySelector('.total-screen');
const resetButton = document.querySelector('.reset-btn');


bill.addEventListener('input', inputBill);
tipButton.forEach(btn => {
    btn.addEventListener('click', setClick);
});
customInput.addEventListener('input', setCustomInput);
peopleInput.addEventListener('input', setPeopleInput);
resetButton.addEventListener('click', resetAll);

let billVal = 0.0;
let peopleVal = 1;
let tipVal = 0.05;

function validateFloat(num){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return num.match(rgx);
}

function validateInt(num){
    var rgx = /^[0-9]*$/;
    return num.match(rgx);
}

function inputBill(){
    if(bill.value.includes(',')){
        bill.value = bill.value.replace(',', '.');
    }

    if(!validateFloat(bill.value)){
        bill.value = bill.value.substring(0, bill.value.length-1);
    }

    billVal = parseFloat(bill.value);
    //console.log(billValue);

    //console.log(bill.value);

    tipCalculate();
}

function setClick(event){
    //console.log("test");
    tipButton.forEach(btn => {
        btn.classList.remove('active');
        if(event.target.innerHTML == btn.innerHTML){
            btn.classList.add('active');
            tipVal = parseFloat(btn.innerHTML)/100;
        }
    });

    customInput.value = '';
    //console.log(tipVal);
    tipCalculate();
    
}

function setCustomInput(){
    tipButton.forEach(btn => {
        btn.classList.remove('active');
    });

    if(!validateInt(customInput.value)){
        customInput.value = customInput.value.substring(0, customInput.value.length-1);
    }

    tipVal = parseFloat(customInput.value)/100;
    tipCalculate();
}

function setPeopleInput(){
    if(!validateInt(peopleInput.value)){
        peopleInput.value = peopleInput.value.substring(0, peopleInput.value.length-1);
    }

    peopleVal = parseInt(peopleInput.value);

    if(peopleVal <= 0){
        errorPeopleInput.classList.add('show');
        setTimeout(function(){
            errorPeopleInput.classList.remove('show')
        }, 3000);
    }

    tipCalculate();
}   

function tipCalculate(){
    if(peopleVal >= 1){
        let tipAmount = billVal * tipVal / peopleVal;
        let total = billVal * (tipVal + 1) / peopleVal;
        tipAmountResult.value = '$'+ tipAmount.toFixed(2);
        totalResult.value = '$' + total.toFixed(2);
        //console.log(tipAmountResult.value);
        //console.log(totalResult.value);
    }
}

function resetAll(){
    bill.value = 0.0;
    inputBill();

    peopleInput.value = 1;
    setPeopleInput();


    tipButton[0].click();

        console.log('reset');
}


