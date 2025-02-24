"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Function that takes the input from the text box and passes it to check the credit card number and details
function btnCheckCCNumber() {
    // constants for the input element, output paragraph, and info container
    const inputElement = document.getElementById("txt-cc-number");
    const outputParagraph = document.getElementById("info-paragraph");
    const infoContainer = document.getElementById("info-container");
    // clear the output paragraph and hide the info container
    outputParagraph.innerHTML = "";
    infoContainer.style.display = "none";
    // if the input element exists, split the input value into an array of numbers
    if (inputElement) {
        const CC = inputElement.value.split("").map(Number);
        // check if the credit card number is valid and display the results, if not valid, display an error
        if (CC.length >= 8 && CC.length <= 19) {
            checkCCNumber(CC);
            checkCCDetails(CC);
        }
        else {
            infoContainer.style.display = "block";
            outputParagraph.innerHTML += "Please enter a valid credit card number (8 to 19 digits).";
        }
    }
}
// Function to check the credit card number based on the luhn algorithm
function checkCCNumber(ccNumber) {
    // get the output paragraph element
    const outputParagraph = document.getElementById("info-paragraph");
    outputParagraph.innerHTML = "";
    // log the credit card number to the console
    console.log("Checking credit card number:", ccNumber);
    // set the luhn sum to 0
    let luhnSum = 0;
    // iterate through the credit card number array, adds the numbers together, doubles every other number starting from the right
    for (let i = 0; i < ccNumber.length; i++) {
        let digit = ccNumber[i];
        if ((ccNumber.length - i) % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        luhnSum += digit;
    }
    // log the luhn sum to the console
    console.log("Luhn sum:", luhnSum);
    // check if the luhn sum is divisible by 10, if so, the credit card number is valid, if not, it is invalid, displays an error accordingly
    if (luhnSum % 10 === 0) {
        console.log("Valid credit card number");
        outputParagraph.innerHTML += "Valid credit card number" + "<br>";
        return true;
    }
    else {
        console.log("Invalid credit card number");
        outputParagraph.innerHTML += "Invalid credit card number" + "<br>";
        return false;
    }
}
// Function to check the credit card details based on the digits
function checkCCDetails(ccNumber) {
    // constants for the output paragraph and info paragraph
    const outputParagraph = document.getElementById("info-paragraph");
    const infoContainer = document.getElementById("info-container");
    const bankTypeDropdown = document.getElementById("bankNameType");
    const selectedBank = bankTypeDropdown.value;
    // constants for the first digit info and bank types
    const firstDigitInfo = [
        "Airlines", "Airlines",
        "Travel and Entertainment", "Banking and Financial",
        "Banking and Financial", "Merchandising and Banking",
        "Petroleum", "Healthcare and Telecommunications",
        "National Assignment"
    ];
    const bankTypes = ['td', 'rbc', 'bmo', 'scotia', 'cibc'];
    // get the first digit, account number, and the first 6 digits from the credit card number
    const firstDigit = ccNumber[0];
    const first6Digits = ccNumber.slice(0, 6);
    const accountNum = ccNumber.slice(6, ccNumber.length - 1);
    // log the credit card number to the console
    console.log(ccNumber);
    console.log("First digit:", firstDigit);
    console.log("First 6 digits:", first6Digits);
    console.log("Account Numbers:", accountNum);
    // display the credit card number details in the output paragraph
    outputParagraph.innerHTML = `
        Info about the credit card number:<br>
        This card was issued for the ${firstDigitInfo[firstDigit - 1]} industry<br>
        Digits regarding your bank account number: ${accountNum.join("")}<br>
    `;
    // check if the selected bank type is valid, if so, display the bank type in the output paragraph
    const cardPrefixes = {
        "4": "visa",
        "51": "mastercard", "52": "mastercard", "53": "mastercard", "54": "mastercard", "55": "mastercard",
        "34": "amex", "37": "amex",
        "65": "discover", "6011": "discover", "644": "discover"
    };
    // constants for the first 2 and 4 digits of the credit card number
    const firstTwoDigits = first6Digits.slice(0, 2).join("");
    const firstFourDigits = first6Digits.slice(0, 4).join("");
    // check if the credit card number has a valid prefix and display the card type in the output paragraph
    let cardType = cardPrefixes[firstTwoDigits] || cardPrefixes[firstFourDigits] || cardPrefixes[firstDigit.toString()] || "unknown";
    if (cardType !== "unknown") {
        outputParagraph.innerHTML += `This is a ${cardType} card<br>`;
    }
    // check if the selected bank type is valid, if so, update the background image of the info container
    const bankType = bankTypes.includes(selectedBank) ? selectedBank : '';
    updateImgs(cardType, bankType);
    // display the info container
    infoContainer.style.display = "block";
}
// passes infomation to generate a valid CC number based on the selected bank, industry or carrier type
function generateCCNumber() {
    // constants for the selected bank, industry, and card type dropdowns
    const cardTypeDropdown = document.getElementById("cardNameType");
    const industryTypeDropdown = document.getElementById("industryType");
    const bankTypeDropdown = document.getElementById("bankNameType");
    const selectedCardType = cardTypeDropdown.value;
    const selectedIndustryType = industryTypeDropdown.value;
    const selectedBankType = bankTypeDropdown.value;
    // variables for the prefix, bank type, and card length requirments
    let prefix = 0;
    let cardLength = 0;
    let bankType = '';
    // counter for how many drop down menus are selected
    let selectionCount = 0;
    if (selectedCardType !== "anything") {
        selectionCount++;
    }
    if (selectedIndustryType !== "anything") {
        selectionCount++;
    }
    if (selectedBankType !== "anything") {
        selectionCount++;
    }
    // check if more than one dropdown option is selected, display an error message and return if so, and ask for user input if no options are selected
    if (selectionCount > 1) {
        alert('Please select only one dropdown option at a time.');
        return;
    }
    else if (selectionCount === 0) {
        alert('Please select a card type, industry, or bank.');
        return;
    }
    // takes the users input
    if (selectedCardType !== "anything") {
        // Set the prefix and card length accordingly to selected card carrier
        switch (selectedCardType) {
            case "visa":
                prefix = 4;
                cardLength = 16;
                break;
            case "mastercard":
                prefix = Math.floor(Math.random() * 5) + 51;
                cardLength = 16;
                break;
            case "amex":
                prefix = Math.random() < 0.5 ? 34 : 37;
                cardLength = 15;
                break;
            case "discover":
                prefix = Math.random() < 0.33 ? 6011 : (Math.random() < 0.5 ? 644 : 65);
                cardLength = 16;
                break;
        }
    }
    else if (selectedIndustryType != "anything") { // takes the users input
        // Set the prefix and card length accordingly to selected industry type
        switch (selectedIndustryType) {
            case "air":
                prefix = Math.random() < 0.5 ? 1 : 2;
                cardLength = 16;
                break;
            case "travel":
                prefix = 3;
                cardLength = 16;
                break;
            case "banking":
                prefix = Math.random() < 0.5 ? 4 : 5;
                cardLength = 16;
                break;
            case "merch":
                prefix = 6;
                cardLength = 16;
                break;
            case "petrol":
                prefix = 7;
                cardLength = 16;
                break;
            case "tele":
                prefix = 8;
                cardLength = 16;
                break;
            case "national":
                prefix = 9;
                cardLength = 16;
                break;
        }
    }
    else if (selectedBankType !== "anything") { // takes the users input
        // Set the prefix and card length accordingly to selected
        switch (selectedBankType) {
            case "bmo":
                prefix = Math.floor(Math.random() * 9) + 1;
                cardLength = 16;
                bankType = "bmo";
                break;
            case "cibc":
                prefix = Math.floor(Math.random() * 9) + 1;
                ;
                cardLength = 16;
                bankType = "cibc";
                break;
            case "rbc":
                prefix = Math.floor(Math.random() * 9) + 1;
                ;
                cardLength = 16;
                bankType = "rbc";
                break;
            case "scotia":
                prefix = Math.floor(Math.random() * 9) + 1;
                ;
                cardLength = 16;
                bankType = "scotia";
                break;
            case "td":
                prefix = Math.floor(Math.random() * 9) + 1;
                ;
                cardLength = 16;
                bankType = "td";
                break;
        }
    }
    // generate a random credit card number with the selected prefix and card length
    makeCCNumber(prefix, cardLength, bankType);
}
// updates the images of the credit card and bank based on the card type and bank type
function updateImgs(cardType, bankType) {
    // constants for the card brand image, bank brand image, card front, and card back
    const cardBrandImg = document.getElementById('card-brand');
    const cardBrandImgBack = document.getElementById('card-brand-bottom');
    const bankBrandImg = document.getElementById('bank-brand');
    const cardFront = document.getElementById('credit-card');
    const cardBack = document.getElementById('card-back');
    // update the images based on the selected card type and bank type, if no type is selected, clear the images
    if (cardType !== '') {
        cardBrandImg.src = `../imgs/${cardType}.png`;
        cardBrandImg.alt = `${cardType} Card`;
        cardBrandImgBack.src = `../imgs/${cardType}.png`;
    }
    else {
        cardBrandImg.src = '';
        cardBrandImg.alt = '';
        cardBrandImgBack.src = '';
    }
    // update the bank brand image based on the selected bank type, if no type is selected, clear the image
    if (bankType !== '') {
        bankBrandImg.src = `../imgs/${bankType}.png`;
        bankBrandImg.alt = `${bankType} Bank`;
    }
    else {
        bankBrandImg.src = '';
        bankBrandImg.alt = '';
    }
    // update the card background based on the selected card type
    switch (cardType) {
        case "visa":
            cardFront.style.background = 'linear-gradient(135deg, #a6a6a6, #1a1f71)';
            cardBack.style.background = 'linear-gradient(135deg, #a6a6a6, #1a1f71)';
            break;
        case "mastercard":
            cardFront.style.background = 'linear-gradient(135deg, #1E3A8A, #A8C0FF)';
            cardBack.style.background = 'linear-gradient(135deg, #1E3A8A, #A8C0FF)';
            break;
        case "amex":
            cardFront.style.background = 'linear-gradient(135deg, #333333, #FF9900)';
            cardBack.style.background = 'linear-gradient(135deg, #333333, #FF9900)';
            break;
        case "discover":
            cardFront.style.background = 'linear-gradient(135deg, #F79C42, #EB001B)';
            cardBack.style.background = 'linear-gradient(135deg, #F79C42, #EB001B)';
            break;
        default:
            cardFront.style.background = 'linear-gradient(135deg, #9a9898, #cec5c5)';
            cardBack.style.background = 'linear-gradient(135deg, #9a9898, #cec5c5)';
            break;
    }
}
// generates a random credit card number with the selected prefix and card length following the luhn alorigthem 
function makeCCNumber(ccType, ccLength, ccBank) {
    // variables for the credit card and luhn sum
    let newCC = [];
    let LuhnSum = 0;
    // constant for the output paragraph
    const outputParagraph = document.getElementById("card-number");
    // constant for the prefix of the credit card
    const ccTypeArray = ccType.toString().split('').map(Number);
    // clear the output paragraph and log the credit card type array
    outputParagraph.innerHTML = "";
    console.log(ccTypeArray);
    // add the prefix to the credit card number array
    for (let i = 0; i < ccTypeArray.length; i++) {
        newCC.push(ccTypeArray[i]);
    }
    // add random numbers to the credit card number array until the length is one less than the required length
    for (let i = ccTypeArray.length; i < ccLength - 1; i++) {
        newCC.push(Math.floor(Math.random() * 10));
        if (i == 2) {
            if (newCC[0] == 3 && (newCC[1] == 4 || newCC[1] == 7)) {
                ccLength = 15;
            }
        }
    }
    // goes through the credit card number array, adds the numbers together, doubles every other number starting from the right
    for (let i = 0; i < ccLength - 1; i++) {
        let digit = newCC[i];
        if ((14 - i) % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
            LuhnSum += digit;
        }
        else {
            LuhnSum += digit;
        }
    }
    // calculates the last digit of the credit card number based on the luhn sum
    let lastDigit = (10 - (LuhnSum % 10)) % 10;
    // if the last digit is invalid, generate a new one
    if (lastDigit < 0 || lastDigit > 9) {
        return makeCCNumber(ccType, ccLength, ccBank);
    }
    else {
        newCC.push(lastDigit);
        LuhnSum += lastDigit;
    }
    // if the luhn sum is invalid, generate a new credit card number
    if (LuhnSum % 10 !== 0) {
        return makeCCNumber(ccType, ccLength, ccBank);
    }
    // format the credit card number and display it in the output paragraph
    let newCCNumber = '';
    if (ccLength === 15) { // if credit card length is 15, format the credit card number with 4-6-5 digits
        newCCNumber = newCC.join("").replace(/(\d{4})(\d{6})(\d{5})/g, "$1-$2-$3");
    }
    else if (ccLength === 16) { // if credit card length is 16, format the credit card number with 4-4-4-4 digits
        newCCNumber = newCC.join("").replace(/(\d{4})/g, "$1-").slice(0, -1);
    }
    // display the credit card number in the output paragraph
    outputParagraph.innerHTML = newCCNumber;
    // variables for the card type and bank type
    let cardType = '';
    let bankType = '';
    // variables and constants for the card type and bank type
    const bankTypeDropdown = document.getElementById("bankNameType");
    const bankTypes = ['td', 'rbc', 'bmo', 'scotia', 'cibc'];
    const selectedBank = bankTypeDropdown.value;
    const cardTypes = ['visa', 'mastercard', 'amex', 'discover', ''];
    let randomBank = Math.floor(Math.random() * bankTypes.length);
    // update the card type and bank type based on the selected card type
    if (newCC[0] === 4) {
        cardType = cardTypes[0];
    }
    else if (newCC[0] === 5 && newCC[1] >= 1 && newCC[1] <= 5) {
        cardType = cardTypes[1];
    }
    else if (newCC[0] === 3 && (newCC[1] === 4 || newCC[1] === 7)) {
        cardType = cardTypes[2];
    }
    else if (newCC[0] === 6 && ((newCC[1] === 0 && newCC[2] === 1 && newCC[3] === 1) || (newCC[1] === 4 && newCC[2] === 4) || (newCC[1] === 5))) {
        cardType = cardTypes[3];
    }
    else {
        cardType = cardTypes[4];
    }
    // update the bank type based on the selected bank type
    if (bankType !== '') {
        switch (bankType) {
            case "bmo":
                bankType = bankTypes[2];
                break;
            case "cibc":
                bankType = bankTypes[4];
                break;
            case "rbc":
                bankType = bankTypes[1];
                break;
            case "scotia":
                bankType = bankTypes[3];
                break;
            case "td":
                bankType = bankTypes[0];
                break;
        }
    }
    else {
        for (let i = 0; i < bankTypes.length; i++) {
            if (selectedBank === 'anything') {
                bankType = bankTypes[randomBank];
            }
            else if (selectedBank === bankTypes[i]) {
                bankType = bankTypes[i];
                break;
            }
        }
    }
    // update the card image in the HTML
    updateImgs(cardType, bankType);
    // update the expiration date, card name, and CVC in the HTML
    randomDateNameCVC();
    // log the generated credit card number, luhn sum, and the credit card and bank type
    console.log("Generated credit card number: " + newCCNumber);
    console.log("Luhn sum:", LuhnSum);
    console.log("Generated CC:", newCC);
    // return the generated credit card number
    return newCCNumber;
}
// generates a random date, name, and CVC for the credit card
function randomDateNameCVC() {
    // constants for the expiration date, card name, and CVC in the HTML
    const date = document.getElementById("card-expiry");
    const nameInput = document.getElementById('card-name');
    const cvc = document.getElementById('cvc');
    // generate a random CVC between 100 and 999, and format it to have leading zeros if necessary
    let randomCVC = Math.floor(Math.random() * 1000);
    if (randomCVC < 100) {
        cvc.innerHTML = "0" + randomCVC;
    }
    else {
        cvc.innerHTML = randomCVC.toString();
    }
    // generate a random name from a predefined list of names
    let name = '';
    let randomNumber = Math.random();
    name = randomNumber < 0.475 ? "James Lee" : randomNumber < 0.95 ? "Ayrton Wong" : "Mr. Hsiung";
    nameInput.innerHTML = name;
    // generate a random expiration date between the current date and 5 years from now, and format it to MM/YYYY
    let month = Math.floor(Math.random() * 12) + 1;
    let year = new Date().getFullYear() + Math.floor(Math.random() * 5) - 1999;
    let formattedMonth = month < 10 ? "0" + month : month;
    date.innerHTML = formattedMonth + "/" + year;
}
//# sourceMappingURL=CreditCard.js.map