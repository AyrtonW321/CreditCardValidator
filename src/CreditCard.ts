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
            checkCCDetails(CC);
        } else {
            outputParagraph.innerHTML += 'Please enter a valid 16-digit credit card number.';
        }
    }
}

// Function to generate a new credit card number
function checkCCNumber(ccNumber: number[]): boolean {
    // create a constant for accessing the paragraph for displaying results
    const outputParagraph = document.getElementById('info-paragraph') as HTMLInputElement;
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
        console.log('Valid credit card number');
        outputParagraph.innerHTML += 'Valid credit card number' + '<br>';
        return true;
    } else {
        console.log('Invalid credit card number');
        outputParagraph.innerHTML += 'Invalid credit card number' + '<br>';
        return false;
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
    // Add hyphens every 4 digits and remove the trailing hyphen
    const newCCNumber = newCC.join('').replace(/(\d{4})/g, '$1-').slice(0, -1); 
    outputParagraph.innerHTML = newCCNumber;

    // display the Luhn sum and the generated CC for debugging
    console.log('Generated credit card number: ' + newCCNumber);
    console.log('Luhn sum:', LuhnSum);
    console.log('Generated CC:', newCC);
    return newCCNumber;
}

function checkCCDetails(ccNumber: number[]) {
    const outputParagraph = document.getElementById('info-paragraph') as HTMLInputElement;
    outputParagraph.innerHTML = 'Info about the credit card number:' + '<br>';
    console.log(ccNumber);
    let firstDigitInfo: string[] = ['Airlines', 'Airlines', 'Travel and Entertainment', 'Banking and Financial', 'Banking and Financial', 'Merchandising and Banking', 'Petroleum', 'Healthcare and Telecommunications', 'National Assignment'];
    let firstDigit: number = ccNumber[0];
    let first6Digits: number[] = ccNumber.slice(0, 6);
    let first7To15Digits: number[] = ccNumber.slice(6, 15);
    console.log(firstDigit);
    console.log(first6Digits);
    console.log(first7To15Digits);
    // Check the first digit of the credit card number to determine the industry it was issued for
    outputParagraph.innerHTML += 'This card was issued for the ' + firstDigitInfo[firstDigit-1] + ' industry' + '<br>';
    // Check the first 6 digits of the credit card number to determine the type of card
    if (first6Digits[0] == 4){
        outputParagraph.innerHTML += 'This is a Visa card' + '<br>';
    } else if (first6Digits[0] == 5 && first6Digits[1] >= 1 && first6Digits[1] <= 5){
        outputParagraph.innerHTML += 'This is a MasterCard' + '<br>';
    } else if (first6Digits[0] == 3 && first6Digits[1] == 4 || first6Digits[1] == 7){
        outputParagraph.innerHTML += 'This is a American Express card' + '<br>';
    } else if (first6Digits[0] == 6 && first6Digits[1] == 5){
        outputParagraph.innerHTML += 'This is a Discover card' + '<br>';
    } else if (first6Digits[0] == 6 && first6Digits[1] == 0 && first6Digits[2] == 1 && first6Digits[3] == 1){
        outputParagraph.innerHTML += 'This is a Discover card' + '<br>';
    } else if (first6Digits[0] == 6 && first6Digits[1] == 4 && first6Digits[2] == 4){
        outputParagraph.innerHTML += 'This is a Discover card' + '<br>';
    } else if (first6Digits = [3, 7, 6, 2, 1, 1]){
        outputParagraph.innerHTML += 'This is a Signapore Airlines Krisflyer card' + '<br>';
    } else if (first6Digits = [5, 2, 9, 9, 6, 2]){
        outputParagraph.innerHTML += 'This is a pre-paid Much-Music Mastercard' + '<br>';
    }
    outputParagraph.innerHTML += '7 digits regarding your bank account number: '+ first7To15Digits.join('') + '<br>';
}