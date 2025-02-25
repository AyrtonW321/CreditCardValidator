function btnCheckCCNumber() : void {
    const outputParagraph = document.getElementById("info-paragraph") as HTMLInputElement;
    const infoContainer = document.getElementById("info-container") as HTMLDivElement;
    const inputElement = document.getElementById("txt-cc-number") as HTMLInputElement;
    const creditCardNumber: string = inputElement.value.trim();
    
    outputParagraph.innerHTML = "";
    infoContainer.style.display = "none";

    if (creditCardNumber.length < 8 || creditCardNumber.length > 19) {
        infoContainer.style.display = "block";
        outputParagraph.innerHTML = "Please enter a valid credit card number (8 to 19 digits).";
        return;
    }

    const CC: number[] = creditCardNumber.split('').map(Number);

    if (checkCCNumber(CC)) {
        checkCCDetails(CC);
    } else {
        infoContainer.style.display = "block";
        outputParagraph.innerHTML = "Please enter a valid credit card number.";
    }
}

function checkCCNumber(ccNumber: number[]): boolean {
    const outputParagraph = document.getElementById("info-paragraph") as HTMLInputElement;
    outputParagraph.innerHTML = "";

    let luhnSum: number = 0;

    for (let i: number = 0; i < ccNumber.length; i++) {
        let digit: number = ccNumber[i];
        if ((ccNumber.length - i) % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        luhnSum += digit;
    }

    const isValid: boolean = luhnSum % 10 === 0;

    console.log("Luhn sum:", luhnSum);
    console.log("Checking credit card number:", ccNumber);
    console.log(isValid ? "Valid credit card number" : "Invalid credit card number");
    outputParagraph.innerHTML += `${isValid ? "Valid" : "Invalid"} credit card number<br>`;

    return isValid;
}

function checkCCDetails(ccNumber: number[]): void {
    const outputParagraph = document.getElementById("info-paragraph") as HTMLParagraphElement;
    const infoContainer = document.getElementById("info-container") as HTMLDivElement;
    const bankTypeDropdown = document.getElementById("bankNameType") as HTMLSelectElement;
    const selectedBank: string = bankTypeDropdown.value;

    const firstDigitInfo: string[] = [
        "Airlines", "Airlines",
        "Travel and Entertainment", "Banking and Financial",
        "Banking and Financial", "Merchandising and Banking",
        "Petroleum", "Healthcare and Telecommunications",
        "National Assignment"
    ];

    const bankTypes: string[] = ['td', 'rbc', 'bmo', 'scotia', 'cibc'];

    const firstDigit: number = ccNumber[0];
    const first6Digits: string = ccNumber.slice(0, 6).join("");
    const accountNum: number[] = ccNumber.slice(6, ccNumber.length - 1);

    console.log(ccNumber);
    console.log("First digit:", firstDigit);
    console.log("First 6 digits:", first6Digits);
    console.log("Account Numbers:", accountNum);

    outputParagraph.innerHTML = `
        Info about the credit card number:<br>
        This card was issued for the ${firstDigitInfo[firstDigit - 1]} industry<br>
        Digits regarding your bank account number: ${accountNum}<br>
    `;

    // Dictionary
    const cardPrefixes: { [key: string]: string } = {
        "4": "visa",
        "51": "mastercard", "52": "mastercard", "53": "mastercard", "54": "mastercard", "55": "mastercard",
        "34": "amex", "37": "amex",
        "65": "discover", "6011": "discover", "644": "discover"
    };

    const firstTwoDigits: string = first6Digits.slice(0, 2);
    const firstFourDigits: string = first6Digits.slice(0, 4);
    
    let cardType: string = cardPrefixes[firstTwoDigits] || cardPrefixes[firstFourDigits] || cardPrefixes[firstDigit.toString()] || "unknown";
    if (cardType !== "unknown") {
        outputParagraph.innerHTML += `This is a ${cardType} card<br>`;
    }

    const bankType: string = bankTypes.includes(selectedBank) ? selectedBank : '';
    updateImgs(cardType, bankType);

    // display the info container
    infoContainer.style.display = "block";
}

function generateCCNumber(): void {
    // constants for the selected bank, industry, and card type dropdowns
    const cardTypeDropdown = document.getElementById("cardNameType") as HTMLSelectElement;
    const industryTypeDropdown = document.getElementById("industryType") as HTMLSelectElement;
    const bankTypeDropdown = document.getElementById("bankNameType") as HTMLSelectElement;

    // variables for the prefix, bank type, and card length requirments
    const selectedCardType: string = cardTypeDropdown.value;
    const selectedIndustryType: string = industryTypeDropdown.value;
    const selectedBankType: string = bankTypeDropdown.value;

    // counter for how many drop down menus are selected
    let selections: number = 0;
    if (selectedCardType !== "anything") {
        selections++;
    }
    if (selectedIndustryType !== "anything") {
        selections++;
    }
    if (selectedBankType !== "anything") {
        selections++;
    }

    // check if more than one dropdown option is selected, display an error message and return if so, and ask for user input if no options are selected
    if (selections > 1) {
        alert('Please select only one dropdown option at a time.');
        return;
    } else if (selections === 0) {
        alert('Please select a card type, industry, or bank.');
        return;
    }

    // variables for the prefix, card length, and bank type 
    let prefix: number = 0;
    let cardLength: number = 16;
    let bankType: string = '';

    // takes the users input
    if (selectedCardType !== "anything") {
        // Set the prefix and card length accordingly to selected card carrier
        switch (selectedCardType) {
            case "visa":
                prefix = 4;
                break;
            case "mastercard":
                prefix = Math.floor(Math.random() * 5) + 51;
                break;
            case "amex":
                prefix = Math.random() < 0.5 ? 34 : 37;
                cardLength = 15;
                break;
            case "discover":
                prefix = [6011, 644, 65][Math.floor(Math.random() * 3)];
                break;
        }
    } else if (selectedIndustryType !== "anything") {
        // Set the prefix and card length accordingly to selected
        switch (selectedIndustryType) {
            case "air":
                prefix = Math.random() < 0.5 ? 1 : 2;
                break;
            case "travel":
                prefix = 3;
                break;
            case "banking":
                prefix = Math.random() < 0.5 ? 4 : 5;
                break;
            case "merch":
                prefix = 6
                break;
            case "petrol":
                prefix = 7;
                break;
            case "tele":
                prefix = 8;
                break;
            case "national":
                prefix = 9;
                break;
        }
    } else if (selectedBankType !== "anything") {
        // random prefix and bank type
        prefix = Math.floor(Math.random() * 9) + 1;
        bankType = selectedBankType;
    }

    // generate a random credit card number with the selected prefix and card length
    makeCCNumber(prefix, cardLength, bankType);
}

// Maps banks to their valid card types
const bankToCards: { [key: string]: string[] } = {
    "TD": ["visa"],
    "Scotiabank": ["visa", "mastercard", "amex"],
    "RBC": ["visa", "mastercard", "amex"],
    "BMO": ["visa", "mastercard"],
    "CIBC": ["visa", "mastercard"],
    "Discover": ["discover"]
};

// Maps card types to banks that offer them
const cardToBanks: { [key: string]: string[] } = {
    "visa": ["TD", "Scotiabank", "RBC", "BMO", "CIBC"],
    "mastercard": ["Scotiabank", "RBC", "BMO", "CIBC"],
    "amex": ["Scotiabank", "RBC"],
    "discover": ["Discover"]
};

// Select a random value from an array
function getRandomItem(arr: string[]): string {
    return arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : "";
}

// Handles when the user selects a bank
function handleBankSelection(bankType: string): void {
    if (!bankToCards[bankType]) return;

    const validCards = bankToCards[bankType];
    const selectedCardType = getRandomItem(validCards);

    updateDropdown("card-dropdown", validCards); // Update card dropdown options
    updateImgs(selectedCardType, bankType);
}

// Handles when the user selects a card type
function handleCardSelection(cardType: string): void {
    if (!cardToBanks[cardType]) return;

    const validBanks = cardToBanks[cardType];
    const selectedBank = getRandomItem(validBanks);

    updateDropdown("bank-dropdown", validBanks); // Update bank dropdown options
    updateImgs(cardType, selectedBank);
}

// Dynamically update dropdown options based on valid selections
function updateDropdown(dropdownId: string, validOptions: string[]): void {
    const dropdown = document.getElementById(dropdownId) as HTMLSelectElement;
    if (!dropdown) return;

    dropdown.innerHTML = ""; // Clear existing options

    validOptions.forEach(option => {
        const newOption = document.createElement("option");
        newOption.value = option;
        newOption.textContent = option;
        dropdown.appendChild(newOption);
    });

    dropdown.selectedIndex = 0; // Select the first valid option
}

// Updates images based on card type and bank
function updateImgs(cardType: string, bankType: string): void {
    const cardBrandImg = document.getElementById('card-brand') as HTMLImageElement;
    const cardBrandImgBack = document.getElementById('card-brand-bottom') as HTMLImageElement;
    const bankBrandImg = document.getElementById('bank-brand') as HTMLImageElement;
    const cardFront = document.getElementById('credit-card') as HTMLImageElement;
    const cardBack = document.getElementById('card-back') as HTMLImageElement;

    if (cardType) {
        cardBrandImg.src = `../imgs/${cardType}.png`;
        cardBrandImg.alt = `${cardType} Card`;
        cardBrandImgBack.src = `../imgs/${cardType}.png`;
    } else {
        cardBrandImg.src = '';
        cardBrandImg.alt = '';
        cardBrandImgBack.src = '';
    }

    if (bankType) {
        bankBrandImg.src = `../imgs/${bankType}.png`;
        bankBrandImg.alt = `${bankType} Bank`;
    } else {
        bankBrandImg.src = '';
        bankBrandImg.alt = '';
    }

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
function makeCCNumber(ccType: number, ccLength: number, ccBank: string) : string {
    // variables for the credit card and luhn sum
    let newCC: number[] = [];
    let LuhnSum: number = 0;
    // constant for the output paragraph
    const outputParagraph = document.getElementById("card-number") as HTMLInputElement;
    // constant for the prefix of the credit card
    const ccTypeArray: number[] = ccType.toString().split('').map(Number);

    // clear the output paragraph and log the credit card type array
    outputParagraph.innerHTML = "";
    console.log(ccTypeArray);

    // add the prefix to the credit card number array
    for (let i = 0; i < ccTypeArray.length; i++) {
        newCC.push(ccTypeArray[i]);
    }
    // add random numbers to the credit card number array until the length is one less than the required length
    for (let i = ccTypeArray.length; i < ccLength-1; i++) {
        newCC.push(Math.floor(Math.random() * 10));
        if (i == 2) {
            if (newCC[0] == 3 && ( newCC[1] == 4 || newCC[1] == 7)) {
                ccLength = 15;
            }
        }
    }
    // goes through the credit card number array, adds the numbers together, doubles every other number starting from the right
    for (let i = 0; i < ccLength-1; i++) {
        let digit: number = newCC[i];
        if ((14 - i) % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
            LuhnSum += digit;
        } else {
            LuhnSum += digit;
        }
    }

    // calculates the last digit of the credit card number based on the luhn sum
    let lastDigit: number = (10 - (LuhnSum % 10)) % 10;

    // if the last digit is invalid, generate a new one
    if (lastDigit < 0 || lastDigit > 9) {
        return makeCCNumber(ccType, ccLength, ccBank);
    } else {
        newCC.push(lastDigit);
        LuhnSum += lastDigit;
    }
    // if the luhn sum is invalid, generate a new credit card number
    if (LuhnSum % 10 !== 0) {
        return makeCCNumber(ccType, ccLength, ccBank);
    }

    // format the credit card number and display it in the output paragraph
    let newCCNumber: string = '';
    if (ccLength === 15) { // if credit card length is 15, format the credit card number with 4-6-5 digits
        newCCNumber = newCC.join("").replace(/(\d{4})(\d{6})(\d{5})/g, "$1-$2-$3");
    } else if (ccLength === 16) { // if credit card length is 16, format the credit card number with 4-4-4-4 digits
        newCCNumber = newCC.join("").replace(/(\d{4})/g, "$1-").slice(0, -1);
    }
    // display the credit card number in the output paragraph
    outputParagraph.innerHTML = newCCNumber;

    // variables for the card type and bank type
    let cardType: string = '';
    let bankType: string = '';
    
    // variables and constants for the card type and bank type
    const bankTypeDropdown = document.getElementById("bankNameType") as HTMLSelectElement;
    const bankTypes: string[] = ['td', 'rbc', 'bmo', 'scotia', 'cibc'];
    const selectedBank = bankTypeDropdown.value;
    const cardTypes: string[] = ['visa', 'mastercard', 'amex', 'discover', ''];
    let randomBank = Math.floor(Math.random() * bankTypes.length);
 
    // update the card type and bank type based on the selected card type
    if (newCC[0] === 4) {
        cardType = cardTypes[0];
    } else if (newCC[0] === 5 && newCC[1] >= 1 && newCC[1] <= 5) {
        cardType = cardTypes[1];
    } else if (newCC[0] === 3 && (newCC[1] === 4 || newCC[1] === 7)) {
        cardType = cardTypes[2];
    } else if (newCC[0] === 6 && ((newCC[1] === 0 && newCC[2] === 1 && newCC[3] === 1 ) || (newCC[1] === 4 && newCC[2] === 4 ) || (newCC[1] === 5))) {
        cardType = cardTypes[3];
    } else { 
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
    } else { 
        for (let i = 0; i < bankTypes.length; i++) {
            if (selectedBank === 'anything') {
                bankType = bankTypes[randomBank];
            } else if (selectedBank === bankTypes[i]) {
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

// Generate random name, date and cvc
function randomDateNameCVC() : void {
    // Consts for the id of date, name and cvc
    const date = document.getElementById("card-expiry") as HTMLInputElement;
    const nameInput = document.getElementById('card-name') as HTMLInputElement;
    const cvc = document.getElementById('cvc') as HTMLInputElement;

    // Generate random number between 0 -> 999
    let randomCVC: number = Math.floor(Math.random() * 1000);

    // If the cvc generated is less than 100 add a 0 in front
    if (randomCVC < 100) {
        cvc.innerHTML = "0" + randomCVC;
    // If the cvc generated is less than 10 add 2 0's in front
    } else if (randomCVC < 10){
        cvc.innerHTML = "00" + randomCVC
    } else {
        cvc.innerHTML = randomCVC.toString(); // Convert the number into a string
    }

    // Generate a random name
    let name: string = '';
    let randomNumber: number = Math.random();
    name = randomNumber < 0.475 ? "James Lee" : randomNumber < 0.95 ? "Ayrton Wong" : "Mr. Hsiung";
    nameInput.innerHTML = name;

    // generate a random expiration date between the current date and 5 years from now, and format it to MM/YYYY
    let month: number = Math.floor(Math.random() * 12) + 1;
    let year: number = new Date().getFullYear() + Math.floor(Math.random() * 5) - 1999;
    let formattedMonth = month < 10 ? "0" + month : month;
    date.innerHTML = formattedMonth + "/" + year;
}