// Function to handle the Check Credit Card button click
function btnCheckCCNumber() : void {
    const outputParagraph = document.getElementById("info-paragraph") as HTMLInputElement;
    const infoContainer = document.getElementById("info-container") as HTMLDivElement;
    const inputElement = document.getElementById("txt-cc-number") as HTMLInputElement;
    const creditCardNumber: string = inputElement.value.trim();
    
    outputParagraph.innerHTML = "";
    infoContainer.style.display = "none";

    // Validate card number length
    if (creditCardNumber.length < 8 || creditCardNumber.length > 19) {
        infoContainer.style.display = "block";
        outputParagraph.innerHTML = "Please enter a valid credit card number (8 to 19 digits).";
        return;
    }

    // Convert string to number array
    // const CC: number[] = creditCardNumber.split('').map(Number);
    const CC: number[] = [];
    for (let i = 0; i < creditCardNumber.length; i++) {
        CC.push(parseInt(creditCardNumber[i]));
    }

    // Check if valid using Luhn algorithm
    if (checkCCNumber(CC)) {
        checkCCDetails(CC);
    } else {
        infoContainer.style.display = "block";
        outputParagraph.innerHTML = "Please enter a valid credit card number.";
    }
}

// Function to validate credit card number using Luhn algorithm
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
    
    const firstDigitInfo: string[] = [
        "Airlines", "Airlines",
        "Travel and Entertainment", "Banking and Financial",
        "Banking and Financial", "Merchandising and Banking",
        "Petroleum", "Healthcare and Telecommunications",
        "National Assignment"
    ];

    const cardPrefixes: { [key: string]: string } = {
        "4": "visa",
        "51": "mastercard", "52": "mastercard", "53": "mastercard", "54": "mastercard", "55": "mastercard",
        "34": "amex", "37": "amex",
        "65": "discover", "6011": "discover", "644": "discover"
    };
    
    // Extract relevant parts of the card number
    const firstDigit: number = ccNumber[0];
    const first6Digits: string = ccNumber.slice(0, 6).join("");
    const accountNum: number[] = ccNumber.slice(6, ccNumber.length - 1);
    
    // Prepare digit combinations for card type check
    const firstDigitStr: string = firstDigit.toString();
    const firstTwoDigits: string = first6Digits.slice(0, 2);
    const firstFourDigits: string = first6Digits.slice(0, 4);
    
    // Determine card type
    let cardType: string = "unknown";
    if (cardPrefixes[firstDigitStr]) {
        cardType = cardPrefixes[firstDigitStr];
    } else if (cardPrefixes[firstTwoDigits]) {
        cardType = cardPrefixes[firstTwoDigits];
    } else if (cardPrefixes[firstFourDigits]) {
        cardType = cardPrefixes[firstFourDigits];
    }

    console.log(ccNumber);
    console.log("First digit:", firstDigit);
    console.log("First 6 digits:", first6Digits);
    console.log("Account Numbers:", accountNum);
    
    // Build output HTML
    let outputHTML = `
        Info about the credit card number:<br>
        This card was issued for the ${firstDigitInfo[firstDigit - 1]} industry<br>
        Digits regarding your bank account number: ${accountNum.join("")}<br>
    `;
    
    if (cardType !== "unknown") {
        outputHTML += `This is a ${cardType} card<br>`;
    }
    
    // Update the UI
    outputParagraph.innerHTML = outputHTML;
    infoContainer.style.display = "block";
}

function generateCCNumber(): void {
    // Get the dropdown elements
    const cardTypeDropdown = document.getElementById("card-name-type") as HTMLSelectElement;
    const industryTypeDropdown = document.getElementById("industry-type") as HTMLSelectElement;
    const bankTypeDropdown = document.getElementById("bank-name-type") as HTMLSelectElement;
    
    // Get the selected values
    const selectedCardType = cardTypeDropdown.value;
    const selectedIndustryType = industryTypeDropdown.value;
    const selectedBankType = bankTypeDropdown.value;
    
    // Count selections
    let selections = 0;
    let selectedOption = "";
    
    if (selectedCardType !== "anything") {
        selections++;
        selectedOption = "card";
    }
    if (selectedIndustryType !== "anything") {
        selections++;
        selectedOption = "industry";
    }
    if (selectedBankType !== "anything") {
        selections++;
        selectedOption = "bank";
    }
    
    // Validate selections
    if (selections > 1) {
        alert('Please select only one dropdown option at a time.');
        return;
    } else if (selections === 0) {
        alert('Please select a card type, industry, or bank.');
        return;
    }
    
    // Default values
    let prefix = 0;
    let cardLength = 16;
    let bankType = '';
    
    // Process selection based on option type
    if (selectedOption === "card") {
        // Handle card type selection
        if (selectedCardType === "visa") {
            prefix = 4;
        } else if (selectedCardType === "mastercard") {
            prefix = Math.floor(Math.random() * 5) + 51;
        } else if (selectedCardType === "amex") {
            prefix = Math.random() < 0.5 ? 34 : 37;
            cardLength = 15;
        } else if (selectedCardType === "discover") {
            prefix = [6011, 644, 65][Math.floor(Math.random() * 3)];
        }
    } else if (selectedOption === "industry") {
        // Handle industry type selection
        const industryPrefixes: { [key: string]: number[] } = {
            "air": [1, 2],
            "travel": [3],
            "banking": [4, 5],
            "merch": [6],
            "petrol": [7],
            "tele": [8],
            "national": [9]
        };
        
        const prefixOptions = industryPrefixes[selectedIndustryType];
        prefix = prefixOptions[Math.floor(Math.random() * prefixOptions.length)];
    } else {
        // Handle bank type selection
        prefix = Math.floor(Math.random() * 9) + 1;
        bankType = selectedBankType;
    }
    
    // Generate the credit card number
    makeCCNumber(prefix, cardLength, bankType);
}

function updateImgs(): void {
    // Get elements and selected values
    const cardTypeDropdown = document.getElementById("card-name-type") as HTMLSelectElement;
    const bankTypeDropdown = document.getElementById("bank-name-type") as HTMLSelectElement;
    const selectedCardType = cardTypeDropdown.value !== "anything" ? cardTypeDropdown.value : "";
    const selectedBankType = bankTypeDropdown.value !== "anything" ? bankTypeDropdown.value : "";
    
    // Get image elements
    const cardBrandImg = document.getElementById('card-brand') as HTMLImageElement;
    const cardBrandImgBack = document.getElementById('card-brand-bottom') as HTMLImageElement;
    const bankBrandImg = document.getElementById('bank-brand') as HTMLImageElement;
    const cardFront = document.getElementById('credit-card') as HTMLImageElement;
    const cardBack = document.getElementById('card-back') as HTMLImageElement;
    
    // Define valid card types for each bank
    const bankCardRestrictions: { [key: string]: string[] } = {
        "td": ["visa"],
        "bmo": ["visa", "mastercard"],
        "cibc": ["visa", "mastercard"],
        "rbc": ["visa", "mastercard", "amex"],
        "scotia": ["visa", "mastercard", "amex"]
    };
    
    // Bank backgrounds
    const bankBackgrounds: { [key: string]: string } = {
        "td": "linear-gradient(135deg, #00A346, #008026)",
        "bmo": "linear-gradient(135deg, #004196, #1E90FF)",
        "rbc": "linear-gradient(135deg, #003366, #FFD700)",
        "scotia": "linear-gradient(135deg, #E31E24, #B2182B)",
        "cibc": "linear-gradient(135deg, #0071BC, #003A70)",
        "discover": "linear-gradient(135deg, #F79C42, #EB001B)",
        "default": "linear-gradient(135deg, #9a9898, #cec5c5)"
    };
    
    let cardType: string = "";
    let bankType: string = "";
    
    // Determine card and bank types based on user selection
    if (selectedCardType === "discover" || selectedBankType === "discover") {
        // Special case for Discover
        cardType = "discover";
        bankType = "discover";
    } else if (selectedBankType) {
        // User selected a bank
        bankType = selectedBankType;
        
        // Get valid cards for this bank
        const validCards = bankCardRestrictions[bankType] || [];
        
        // If there are valid cards, randomly select one
        if (validCards.length > 0) {
            const randomIndex = Math.floor(Math.random() * validCards.length);
            cardType = validCards[randomIndex];
        }
    } else if (selectedCardType) {
        // User selected a card type
        cardType = selectedCardType;
        
        // Find banks that support this card type
        let matchingBanks: string[] = [];
        
        // Simple loop to find matching banks instead of filter
        for (const bank in bankCardRestrictions) {
            const cardTypes = bankCardRestrictions[bank];
            // Check if this bank supports the selected card type
            for (let i = 0; i < cardTypes.length; i++) {
                if (cardTypes[i] === cardType) {
                    matchingBanks.push(bank);
                    break;
                }
            }
        }
        
        // Randomly select a bank if matches were found
        if (matchingBanks.length > 0) {
            const randomIndex = Math.floor(Math.random() * matchingBanks.length);
            bankType = matchingBanks[randomIndex];
        }
    }
    
    // Update card images
    if (cardType) {
        cardBrandImg.src = `../imgs/${cardType}.png`;
        cardBrandImg.alt = `${cardType} Card`;
        cardBrandImgBack.src = `../imgs/${cardType}.png`;
    } else {
        cardBrandImg.src = "";
        cardBrandImg.alt = "";
        cardBrandImgBack.src = "";
    }
    
    // Update bank images
    if (bankType && bankType !== "discover") {
        bankBrandImg.src = `../imgs/${bankType}.png`;
        bankBrandImg.alt = `${bankType} Bank`;
    } else {
        bankBrandImg.src = "";
        bankBrandImg.alt = "";
    }
    
    // Set background color
    const background = bankBackgrounds[bankType] || bankBackgrounds["default"];
    cardFront.style.background = background;
    cardBack.style.background = background;
}
// generates a random credit card number with the selected prefix and card length following the luhn algorithm
function makeCCNumber(ccType: number, ccLength: number, ccBank: string): string {
    // variables for the credit card and luhn sum
    let newCC: number[] = [];
    let luhnSum: number = 0;
    
    // constant for the output paragraph
    const outputParagraph = document.getElementById("card-number") as HTMLInputElement;
    
    // convert ccType to array of digits
    const ccTypeArray: number[] = ccType.toString().split('').map(Number);

    // clear the output paragraph
    outputParagraph.innerHTML = "";

    // add the prefix to the credit card number array
    for (let i: number = 0; i < ccTypeArray.length; i++) {
        newCC.push(ccTypeArray[i]);
    }
    
    // add random numbers to the credit card number array until the length is one less than the required length
    for (let i: number = ccTypeArray.length; i < ccLength - 1; i++) {
        newCC.push(Math.floor(Math.random() * 10));
        // Check for AMEX and adjust length if needed
        if (i === 2) {
            if (newCC[0] === 3 && (newCC[1] === 4 || newCC[1] === 7)) {
                ccLength = 15;
            }
        }
        // Check for Mastercard and set 19-digit length for specific BIN ranges
        if (i === 5) {
            if (newCC[0] === 5 && newCC[1] >= 1 && newCC[1] <= 5) {
                // 20% chance of getting a 19-digit Mastercard
                if (Math.random() < 0.2) {
                    ccLength = 19;
                }
            }
        }
    }
    
    // Calculate luhn sum - goes through the credit card number array, adds the numbers together
    // doubles every other number starting from the right
    for (let i: number = 0; i < ccLength - 1; i++) {
        let digit: number = newCC[i];
        // For variable length cards, this calculation needs to be relative to card length
        if ((ccLength - 2 - i) % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        luhnSum += digit;
    }

    // calculates the last digit of the credit card number based on the luhn sum
    const lastDigit: number = (10 - (luhnSum % 10)) % 10;

    // add the last digit to the card number and luhn sum
    newCC.push(lastDigit);
    luhnSum += lastDigit;
    
    // if the luhn sum is invalid, generate a new credit card number
    if (luhnSum % 10 !== 0) {
        return makeCCNumber(ccType, ccLength, ccBank);
    }

    // format the credit card number based on its length
    let newCCNumber: string = '';
    if (ccLength === 15) {
        // format AMEX as 4-6-5 digits
        newCCNumber = newCC.join("").replace(/(\d{4})(\d{6})(\d{5})/g, "$1-$2-$3");
    } else if (ccLength === 16) {
        // format as 4-4-4-4 digits
        newCCNumber = newCC.join("").replace(/(\d{4})/g, "$1-").slice(0, -1);
    } else if (ccLength === 19) {
        // format 19-digit Mastercard as 4-4-4-4-3 digits
        newCCNumber = newCC.join("").replace(/(\d{4})(\d{4})(\d{4})(\d{4})(\d{3})/g, "$1-$2-$3-$4-$5");
    }
    
    // display the credit card number in the output paragraph
    outputParagraph.innerHTML = newCCNumber;

    // update the card image in the HTML
    updateImgs();
    
    // update the expiration date, card name, and CVC in the HTML
    randomDateNameCVC();
    
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