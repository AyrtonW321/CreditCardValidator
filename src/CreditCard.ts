function btnCheckCCNumber() {
    const inputElement = document.getElementById('txt-cc-number') as HTMLInputElement;
    if (inputElement) {
        const CC = inputElement.value;
        console.log(CC);
        return CC;
    }
    return null;
}


// this dosent work i swear, idk how to check it so ill js make a check for it and work on this when I got the luhn alogrithm validator working
function makeCCNumber(){
    let newCC: number[] = [];
    let CCTotal: number = 0;
    const outputElement = document.getElementById('info-paragraph') as HTMLInputElement;
    outputElement.innerHTML = '';
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
            if (digit > 9) digit -= 9;
        }
        CCTotal += digit;
    }
    let lastDigit = (70 - CCTotal);
    if (lastDigit < 0 || lastDigit > 9) {
        // Retry if number is negative or greater than 9
        return makeCCNumber();
    } else {
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
