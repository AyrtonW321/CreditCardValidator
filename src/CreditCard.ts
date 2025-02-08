
function btnCheckCCNumber() {
    const inputElement = document.getElementById('txt-cc-number') as HTMLInputElement;
    const outputParagraph = document.getElementById('info-paragraph') as HTMLInputElement;
    outputParagraph.innerHTML = '';
    if (inputElement) {
        const CC: number[] = inputElement.value.split('').map(Number);
        if (CC.length == 16){
            checkCCNumber(CC);
        } else {
            outputParagraph.innerHTML += 'Please enter a valid 16-digit credit card number.';
        }
        return CC;
    }
    return null;
}


// THIS IS WORKING, DO NOT TOUCH
function makeCCNumber(){
    let newCC: number[] = [];
    let CCTotal: number = 0;
    const outputParagraph = document.getElementById('info-paragraph') as HTMLInputElement;
    outputParagraph.innerHTML = '';
    // generate the first 15 digets of the credit card number
    for (let i = 0; i < 15; i++) {
        newCC.push(Math.floor(Math.random() * 10));
    }
    // Calculate Luhn sum (excluding last digit for now)
    for (let i = 0; i < 15; i++) {
        let digit: number = newCC[i];
        // Luhn algorithm: double every second digit from the right
        if ((14 - i) % 2 === 0) {
            digit *= 2;
            if (digit > 9){
                digit -= 9;
            }
            CCTotal += digit;
        } else {
            CCTotal += digit;
        }
    }
    let lastDigit = (10 - (CCTotal % 10)) % 10;
    if (lastDigit < 0 || lastDigit > 9) {
        // Retry if number is negative or greater than 9
        return makeCCNumber();
    } else {
        newCC.push(lastDigit);
        CCTotal += lastDigit;
    }
    if (CCTotal % 10 !==0){
        return makeCCNumber();
    }
    const newCCNumber = newCC.join('');
    outputParagraph.innerHTML = 'Generated credit card number: ' + newCCNumber;
    console.log('Generated credit card number: ' + newCCNumber);
    console.log('Luhn sum:', CCTotal);
    console.log('Generated CC:', newCC);
}

function checkCCNumber(ccNumber: number[]): boolean {
    const outputParagraph = document.getElementById('info-paragraph') as HTMLInputElement;
    outputParagraph.innerHTML = '';
    // placeholder js to see if CC number gets transfered correctly
    console.log('Checking credit card number:', ccNumber);
    let luhnSum: number = 0;
    for (let i = 0; i < ccNumber.length; i++) {
        let digit: number = ccNumber[i];
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
    } else {
        console.log('Invalid credit card number');
        outputParagraph.innerHTML = 'Invalid credit card number';
        return false;
    }
}