"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function btnCheckCCNumber() {
    const inputElement = document.getElementById('txt-cc-number');
    if (inputElement) {
        const CC = inputElement.value;
        console.log(CC);
        return CC;
    }
    return null;
}
function makeCCNumber() {
    let newCC = [];
    let CCTotal = 0;
    const outputElement = document.getElementById('info-paragraph');
    outputElement.innerHTML = '';
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
            if (digit > 9)
                digit -= 9;
        }
        CCTotal += digit;
    }
    let lastDigit = (70 - CCTotal);
    if (lastDigit < 0 || lastDigit > 9) {
        // Retry if number is negative or greater than 9
        return makeCCNumber();
    }
    else {
        newCC.push(lastDigit);
        CCTotal += lastDigit;
    }
    if (CCTotal !== 70) {
        // Retry if sum is not 70
        return makeCCNumber();
    }
    const newCCNumber = newCC.join('');
    outputElement.innerHTML = 'Generated credit card number: ' + newCCNumber;
    console.log(CCTotal);
    console.log(newCC);
}
//# sourceMappingURL=CreditCard.js.map