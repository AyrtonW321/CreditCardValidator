
function btnCheckCCNumber() {
    // create a constant for accessing the credit card number input field
    const inputElement = document.getElementById('txt-cc-number') as HTMLInputElement;
    // create a constant for accessing the paragraph for displaying results
    const outputParagraph = document.getElementById('info-paragraph') as HTMLInputElement;
    outputParagraph.innerHTML = '';
    // check if the input field is not empty
    if (inputElement) {
        // create a constant for storing the credit card number as an array of numbers as it was a string previously
        const CC: number[] = inputElement.value.split('').map(Number);
        // check if the credit card number is 16 digits long, if not, display an error message
        if (CC.length == 16){
            checkCCNumber(CC);
        } else {
            outputParagraph.innerHTML += 'Please enter a valid 16-digit credit card number.';
        }
    }
}


// function to check  the credit card number using Luhn's algorithm
function makeCCNumber(){
    let newCC: number[] = []; // create an array to store the credit card number digits
    let LuhnSum: number = 0; // create a variable to store the Luhn sum
    // create a constant for accessing the paragraph for displaying results
    const outputParagraph = document.getElementById('info-paragraph') as HTMLInputElement;
    outputParagraph.innerHTML = '';
    // generate the first 15 digits of the credit card number
    for (let i = 0; i < 15; i++) {
        newCC.push(Math.floor(Math.random() * 10)); // generate a random number between 0 and 9 and add it to the array
    }
    // Calculate Luhn sum (excluding last digit for now)
    for (let i = 0; i < 15; i++) {
        let digit: number = newCC[i]; // get the digit at the current index
        // Double every second digit from the right
        if ((14 - i) % 2 === 0) {
            digit *= 2;
            // if the result is greater than 9, subtract 9 (same as adding the digits of the results, eg. 9*2 = 18, 1+8 = 9, 18-9 = 9)
            if (digit > 9){
                digit -= 9;
            }
            LuhnSum += digit;
        } else {
            // add the digit to the Luhn sum
            LuhnSum += digit;
        }
    }
    // calculate the last digit that should add up to a number that is divisible by 10
    let lastDigit = (10 - (LuhnSum % 10)) % 10;
    // Check if the last digit is negative or greater than 9
    if (lastDigit < 0 || lastDigit > 9) {
        // Retry if number is negative or greater than 9
        return makeCCNumber();
    } else { // add the last digit to the credit card number
        newCC.push(lastDigit);
        LuhnSum += lastDigit;
    }
    // Check if the calculated Luhn sum is not divisible by 10, if not, retry the process
    if (LuhnSum % 10 !==0){
        return makeCCNumber();
    }
    const newCCNumber = newCC.join(''); // new constant for the generated credit card number
    // display the generated credit card number in the paragraph
    outputParagraph.innerHTML = 'Generated credit card number: ' + newCCNumber;
    // display the Luhn sum and the generated CC for debugging
    console.log('Generated credit card number: ' + newCCNumber);
    console.log('Luhn sum:', LuhnSum);
    console.log('Generated CC:', newCC);
}

// Function to generate a new credit card number
function checkCCNumber(ccNumber: number[]): boolean {
    // create a constant for accessing the paragraph for displaying results
    const outputParagraph = document.getElementById('info-paragraph') as HTMLInputElement;
    outputParagraph.innerHTML = '';
    // display the credit card number being checked in the console
    console.log('Checking credit card number:', ccNumber);
    // create a variable to store the Luhn sum
    let luhnSum: number = 0;
    // calculate the Luhn sum
    for (let i = 0; i < ccNumber.length; i++) {
        // get the digit at the current index (mainly to multiply it by 2 if it's every second digit from the right)
        let digit: number = ccNumber[i];
        // Luhn algorithm: double every second digit from the right
        if ((ccNumber.length - i) % 2 === 0) {
            digit *= 2;
            // if the result is greater than 9, subtract 9 (same as adding the digits of the results, eg. 9*2 = 18, 1+8 = 9, 18-9 = 9)
            if (digit > 9) {
                digit -= 9;
            }
        }
        // add the digit to the Luhn sum
        luhnSum += digit;
    }
    // display the Luhn sum in the console
    console.log('Luhn sum:', luhnSum);
    // check if the calculated Luhn sum is divisible by 10, if so, return true, else, return false and display an error message
    if (luhnSum % 10 === 0) {
        return true;
    } else {
        console.log('Invalid credit card number');
        outputParagraph.innerHTML = 'Invalid credit card number';
        return false;
    }
}