function btnCheckCCNumber() : void {
    const inputElement = document.getElementById("txt-cc-number") as HTMLInputElement;
    const outputParagraph = document.getElementById("info-paragraph") as HTMLInputElement;
    const infoContainer = document.getElementById("info-container") as HTMLDivElement;

    outputParagraph.innerHTML = "";
    infoContainer.style.display = "none";

    if (inputElement) {
        const CC: number[] = inputElement.value.split("").map(Number);
        if (CC.length >= 8 && CC.length <= 19) {
            checkCCNumber(CC);
            checkCCDetails(CC);
        } else {
            infoContainer.style.display = "block";
            outputParagraph.innerHTML += "Please enter a valid credit card number (8 to 19 digits).";
        }
    }
}

function checkCCNumber(ccNumber: number[]): boolean {
    const outputParagraph = document.getElementById("info-paragraph") as HTMLInputElement;
    outputParagraph.innerHTML = "";

    console.log("Checking credit card number:", ccNumber);

    let luhnSum: number = 0;
    
    for (let i = 0; i < ccNumber.length; i++) {
        let digit: number = ccNumber[i];
        if ((ccNumber.length - i) % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        luhnSum += digit;
    }

    console.log("Luhn sum:", luhnSum);
    
    if (luhnSum % 10 === 0) {
        console.log("Valid credit card number");
        outputParagraph.innerHTML += "Valid credit card number" + "<br>";
        return true;
    } else {
        console.log("Invalid credit card number");
        outputParagraph.innerHTML += "Invalid credit card number" + "<br>";
        return false;
    }
}

function checkCCDetails(ccNumber: number[]): void {
    const outputParagraph = document.getElementById("info-paragraph") as HTMLParagraphElement;
    const infoContainer = document.getElementById("info-container") as HTMLDivElement;
    const bankTypeDropdown = document.getElementById("bankNameType") as HTMLSelectElement;
    const selectedBank = bankTypeDropdown.value;

    const firstDigitInfo: string[] = [
        "Airlines", "Airlines",
        "Travel and Entertainment", "Banking and Financial",
        "Banking and Financial", "Merchandising and Banking",
        "Petroleum", "Healthcare and Telecommunications",
        "National Assignment"
    ];
    const bankTypes: string[] = ['td', 'rbc', 'bmo', 'scotia', 'cibc'];

    const firstDigit = ccNumber[0];
    const first6Digits = ccNumber.slice(0, 6);
    const accountNum = ccNumber.slice(6, ccNumber.length - 1);

    console.log(ccNumber);
    console.log("First digit:", firstDigit);
    console.log("First 6 digits:", first6Digits);
    console.log("Account Numbers:", accountNum);

    outputParagraph.innerHTML = `
        Info about the credit card number:<br>
        This card was issued for the ${firstDigitInfo[firstDigit - 1]} industry<br>
        Digits regarding your bank account number: ${accountNum.join("")}<br>
    `;

    const cardPrefixes: { [key: string]: string } = {
        "4": "visa",
        "51": "mastercard", "52": "mastercard", "53": "mastercard", "54": "mastercard", "55": "mastercard",
        "34": "amex", "37": "amex",
        "65": "discover", "6011": "discover", "644": "discover"
    };

    const firstTwoDigits = first6Digits.slice(0, 2).join("");
    const firstFourDigits = first6Digits.slice(0, 4).join("");
    
    let cardType = cardPrefixes[firstTwoDigits] || cardPrefixes[firstFourDigits] || cardPrefixes[firstDigit.toString()] || "unknown";
    if (cardType !== "unknown") {
        outputParagraph.innerHTML += `This is a ${cardType} card<br>`;
    }

    const bankType = bankTypes.includes(selectedBank) ? selectedBank : '';

    updateImgs(cardType, bankType);

    infoContainer.style.display = "block";
}

function generateCCNumber() : void {
    const cardTypeDropdown = document.getElementById("cardNameType") as HTMLSelectElement;
    const industryTypeDropdown = document.getElementById("industryType") as HTMLSelectElement;
    const bankTypeDropdown = document.getElementById("bankNameType") as HTMLSelectElement;
    const selectedCardType = cardTypeDropdown.value;
    const selectedIndustryType = industryTypeDropdown.value;
    const selectedBankType = bankTypeDropdown.value;

    // .classList.remove("hidden");
    // .classList.add("hidden");
    // This turns the container visibility off

    let prefix: number = 0;
    let cardLength: number = 0;

    let selectionCount: number = 0;
    if (selectedCardType !== "anything") selectionCount++;
    if (selectedIndustryType !== "anything") selectionCount++;
    if (selectedBankType !== "anything") selectionCount++;

    if (selectionCount > 1) {
        alert('Please select only one dropdown option at a time.');
        return;
    } else if (selectionCount === 0) {
        alert('Please select a card type, industry, or bank.');
        return;
    }

    if (selectedCardType !== "anything") {
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
                prefix = Math.random() < 0.5 ? 6011 : 644;
                cardLength = 16;
                break;
        }
    } else if (selectedIndustryType != "anything") {
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
    } else if (selectedBankType != "anything") {
        alert('Bank type is not implemented yet.'); //ADD THIS
    }
    makeCCNumber(prefix, cardLength);
}

function updateImgs(cardType: string, bankType: string): void {
    const cardBrandImg = document.getElementById('card-brand') as HTMLImageElement;
    const cardBrandImgBack = document.getElementById('card-brand-bottom') as HTMLImageElement;
    const bankBrandImg = document.getElementById('bank-brand') as HTMLImageElement;
    const cardFront = document.getElementById('credit-card') as HTMLImageElement;
    const cardBack = document.getElementById('card-back') as HTMLImageElement

    if (cardType !== '') {
        cardBrandImg.src = `../imgs/${cardType}.png`;
        cardBrandImg.alt = `${cardType} Card`;
        cardBrandImgBack.src = `../imgs/${cardType}.png`;
    } else {
        cardBrandImg.src = '';
        cardBrandImg.alt = '';
        cardBrandImgBack.src = '';
    }

    if (bankType !== '') {
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

function makeCCNumber(ccType: number, ccLength: number) : string {
    let newCC: number[] = [];
    let LuhnSum: number = 0;

    const outputParagraph = document.getElementById("card-number") as HTMLInputElement;
    const ccTypeArray: number[] = ccType.toString().split('').map(Number);

    outputParagraph.innerHTML = "";
    console.log(ccTypeArray);

    for (let i = 0; i < ccTypeArray.length; i++) {
        newCC.push(ccTypeArray[i]);
    }

    for (let i = ccTypeArray.length; i < ccLength-1; i++) {
        newCC.push(Math.floor(Math.random() * 10));
    }

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

    let lastDigit = (10 - (LuhnSum % 10)) % 10;

    if (lastDigit < 0 || lastDigit > 9) {
        return makeCCNumber(0, 16);
    } else {
        newCC.push(lastDigit);
        LuhnSum += lastDigit;
    }
    
    if (LuhnSum % 10 !== 0) {
        return makeCCNumber(0, 16);
    }

    let newCCNumber = '';
    if (ccLength === 15) {
        newCCNumber = newCC.join("").replace(/(\d{4})(\d{6})(\d{5})/g, "$1-$2-$3");
    } else if (ccLength === 16) {
        newCCNumber = newCC.join("").replace(/(\d{4})/g, "$1-").slice(0, -1);
    }
    outputParagraph.innerHTML = newCCNumber;

    let cardType = '';
    let bankType = '';
    
    const bankTypeDropdown = document.getElementById("bankNameType") as HTMLSelectElement;
    const bankTypes: string[] = ['td', 'rbc', 'bmo', 'scotia', 'cibc'];
    const selectedBank = bankTypeDropdown.value;
    const cardTypes: string[] = ['visa', 'mastercard', 'amex', 'discover'];
    let randomBank = Math.floor(Math.random() * bankTypes.length);
    let randomType = Math.floor(Math.random() * cardTypes.length);

    if (ccType === 4) {
        cardType = cardTypes[0];
    } else if (ccType >= 51 && ccType <= 55) {
        cardType = cardTypes[1];
    } else if (ccType === 34 || ccType === 37) {
        cardType = cardTypes[2];
    } else if (ccType === 6011 || ccType === 644) {
        cardType = cardTypes[3];
    } else { 
        cardType = cardTypes[randomType];
    }

    for (let i = 0; i < bankTypes.length; i++) {
        if (selectedBank === 'anything') {
            bankType = bankTypes[randomBank];
        } else if (selectedBank === bankTypes[i]) {
            bankType = bankTypes[i];
            break;
        }
    }
    
    updateImgs(cardType, bankType);
    randomDateNameCVC();

    console.log("Generated credit card number: " + newCCNumber);
    console.log("Luhn sum:", LuhnSum);
    console.log("Generated CC:", newCC);
    
    return newCCNumber;
}

function randomDateNameCVC() : void {
    const date = document.getElementById("card-expiry") as HTMLInputElement;
    const nameInput = document.getElementById('card-name') as HTMLInputElement;
    const cvc = document.getElementById('cvc') as HTMLInputElement;

    let randomCVC = Math.floor(Math.random() * 1000);
    if (randomCVC < 100) {
        cvc.innerHTML = "0" + randomCVC;
    } else {
        cvc.innerHTML = randomCVC.toString();
    }

    let name: string = '';
    let randomNumber = Math.random();
    name = randomNumber < 0.475 ? "James Lee" : randomNumber < 0.95 ? "Ayrton Wong" : "Mr. Hsiung";
    nameInput.innerHTML = name;

    let month: number = Math.floor(Math.random() * 12) + 1;
    let year: number = new Date().getFullYear() + Math.floor(Math.random() * 5) - 1999;
    let formattedMonth = month < 10 ? "0" + month : month;
    date.innerHTML = formattedMonth + "/" + year;
}