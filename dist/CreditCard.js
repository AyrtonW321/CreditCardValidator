"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function btnCheckCCNumber() {
    // create a constant for accessing the credit card number input field
    const inputElement = document.getElementById('txt-cc-number');
    // create a constant for accessing the paragraph for displaying results
    const outputParagraph = document.getElementById('info-paragraph');
    outputParagraph.innerHTML = '';
    // check if the input field is not empty
    if (inputElement) {
        // create a constant for storing the credit card number as an array of numbers as it was a string previously
        const CC = inputElement.value.split('').map(Number);
        // check if the credit card number is 16 digits long, if not, display an error message
        if (CC.length == 16) {
            checkCCNumber(CC);
        }
        else {
            outputParagraph.innerHTML += 'Please enter a valid 16-digit credit card number.';
        }
    }
}
// THIS IS WORKING, DO NOT TOUCH
function makeCCNumber() {
    let newCC = [];
    let CCTotal = 0;
    const outputParagraph = document.getElementById('info-paragraph');
    outputParagraph.innerHTML = '';
    // generate the first 15 digets of the credit card number
    for (let i = 0; i < 15; i++) {
        newCC.push(Math.floor(Math.random() * 10));
    }
    // Calculate Luhn sum (excluding last digit for now)
    for (let i = 0; i < 15; i++) {
        let digit = newCC[i];
        // Luhn algorithm: double every second digit from the right
        if ((14 - i) % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
            CCTotal += digit;
        }
        else {
            CCTotal += digit;
        }
    }
    let lastDigit = (10 - (CCTotal % 10)) % 10;
    if (lastDigit < 0 || lastDigit > 9) {
        // Retry if number is negative or greater than 9
        return makeCCNumber();
    }
    else {
        newCC.push(lastDigit);
        CCTotal += lastDigit;
    }
    if (CCTotal % 10 !== 0) {
        return makeCCNumber();
    }
    const newCCNumber = newCC.join('');
    outputParagraph.innerHTML = 'Generated credit card number: ' + newCCNumber;
    console.log('Generated credit card number: ' + newCCNumber);
    console.log('Luhn sum:', CCTotal);
    console.log('Generated CC:', newCC);
}
function checkCCNumber(ccNumber) {
    const outputParagraph = document.getElementById('info-paragraph');
    outputParagraph.innerHTML = '';
    // placeholder js to see if CC number gets transfered correctly
    console.log('Checking credit card number:', ccNumber);
    let luhnSum = 0;
    for (let i = 0; i < ccNumber.length; i++) {
        let digit = ccNumber[i];
        // Luhn algorithm: double every second digit from the right
        if ((ccNumber.length - i) % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        luhnSum += digit;
    }
    console.log('Luhn sum:', luhnSum);
    if (luhnSum % 10 === 0) {
        return true;
    }
    else {
        console.log('Invalid credit card number');
        outputParagraph.innerHTML = 'Invalid credit card number';
        return false;
    }
}
//# sourceMappingURL=CreditCard.js.map