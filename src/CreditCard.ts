function btnCheckCCNumber() {
    const inputElement = document.getElementById("txt-cc-number") as HTMLInputElement;
    const outputParagraph = document.getElementById("info-paragraph") as HTMLInputElement;
    const infoContainer = document.getElementById("info-container") as HTMLDivElement;

    outputParagraph.innerHTML = "";
    infoContainer.style.display = "none";

    if (inputElement) {
        const CC: number[] = inputElement.value.split("").map(Number);
        if (CC.length == 16 || CC.length == 19) {
            checkCCNumber(CC);
            checkCCDetails(CC);
        } else {
            infoContainer.style.display = "block";
            outputParagraph.innerHTML += "Please enter a valid 16 or 19 digit credit card number.";
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

function checkCCDetails(ccNumber: number[]) {
    const outputParagraph = document.getElementById("info-paragraph") as HTMLParagraphElement;
    const infoContainer = document.getElementById("info-container") as HTMLDivElement;
    const bankTypeDropdown = document.getElementById("bankNameType") as HTMLSelectElement;
    const selectedBank = bankTypeDropdown.value;
    
    const firstDigitInfo: string[] = [
        "Airlines", "Airlines",
        "Travel and Entertainment", "Banking and Financial",
        "Banking and Financial", "Merchandising and Banking",
        "Petroleum", "Healthcare and Telecommunications",
        "National Assignment"];
    const bankTypes: string[] = ['td', 'rbc', 'bmo', 'scotia', 'cibc'];

    let firstDigit: number = ccNumber[0];
    let first4Digits: number[] = ccNumber.slice(0, 4);
    let first7To15Digits: number[] = ccNumber.slice(6, 15);

    console.log(ccNumber);
    console.log("First digit:", firstDigit);
    console.log("First 4 digits:", first4Digits);
    console.log("Digits 7-15:", first7To15Digits);

    outputParagraph.innerHTML += "Info about the credit card number:" + "<br>";
    outputParagraph.innerHTML += "This card was issued for the " + firstDigitInfo[firstDigit - 1] + " industry" + "<br>";
    outputParagraph.innerHTML += "7 digits regarding your bank account number: " + first7To15Digits.join("") + "<br>";
    
    let cardType: string = "";
    let bankType: string = '';

    if (first4Digits[0] === 4) {
        cardType = "visa";
        outputParagraph.innerHTML += "This is a Visa card" + "<br>";
    } else if (
        first4Digits[0] === 5 &&
        first4Digits[1] >= 1 &&
        first4Digits[1] <= 5
    ) {
        cardType = "mastercard";
        outputParagraph.innerHTML += "This is a MasterCard" + "<br>";
    } else if (
        first4Digits[0] === 3 &&
        (first4Digits[1] === 4 || first4Digits[1] === 7)
    ) {
        cardType = "amex";
        outputParagraph.innerHTML += "This is an American Express card" + "<br>";
    } else if (first4Digits[0] === 6 && first4Digits[1] === 5) {
        cardType = "discover";
        outputParagraph.innerHTML += "This is a Discover card" + "<br>";
    } else if (
        first4Digits[0] === 6 &&
        first4Digits[1] === 0 &&
        first4Digits[2] === 1 &&
        first4Digits[3] === 1
    ) {
        outputParagraph.innerHTML += "This is a Discover card" + "<br>";
    } else if (
        first4Digits[0] === 6 &&
        first4Digits[1] === 4 &&
        first4Digits[2] === 4
    ) {
        outputParagraph.innerHTML += "This is a Discover card" + "<br>";
    }

    for (let i = 0; i < bankTypes.length; i++) {
        if (selectedBank === bankTypes[i]) {
            bankType = bankTypes[i];
        }
    }

    updateImgs(cardType, bankType);
    
    infoContainer.style.display = "block";
}

function generateCCNumber() {
    const cardTypeDropdown = document.getElementById("cardNameType") as HTMLSelectElement;
    const selectedType = cardTypeDropdown.value;

    let randomNumber = Math.floor(Math.random() * 10); 
    let prefix = 0;

    switch (selectedType) {
        case "visa":
            prefix = 4;
            break;
        case "mastercard":
            prefix = Math.floor(Math.random() * 5) + 51;
            break;
        case "amex":
            prefix = Math.random() < 0.5 ? 34 : 37;
            break;
        case "discover":
            prefix = Math.random() < 0.5 ? 6011 : 644;
            break;
        default:
            prefix = randomNumber;
            break;
    }

    makeCCNumber(prefix);
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

function makeCCNumber(ccType: number) {
    let newCC: number[] = [];
    let LuhnSum: number = 0;

    const outputParagraph = document.getElementById("card-number") as HTMLInputElement;
    const ccTypeArray: number[] = ccType.toString().split('').map(Number);

    outputParagraph.innerHTML = "";
    console.log(ccTypeArray);

    for (let i = 0; i < ccTypeArray.length; i++) {
        newCC.push(ccTypeArray[i]);
    }

    for (let i = ccTypeArray.length; i < 15; i++) {
        newCC.push(Math.floor(Math.random() * 10));
    }

    for (let i = 0; i < 15; i++) {
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
        return makeCCNumber(0);
    } else {
        newCC.push(lastDigit);
        LuhnSum += lastDigit;
    }
    
    if (LuhnSum % 10 !== 0) {
        return makeCCNumber(0);
    }

    const newCCNumber = newCC.join("").replace(/(\d{4})/g, "$1-").slice(0, -1);
    outputParagraph.innerHTML = newCCNumber;

    let cardType = '';
    let bankType = '';
    
    const bankTypeDropdown = document.getElementById("bankNameType") as HTMLSelectElement;
    const bankTypes: string[] = ['td', 'rbc', 'bmo', 'scotia', 'cibc'];
    const selectedBank = bankTypeDropdown.value;
    const cardTypes: string[] = ['visa', 'mastercard', 'amex', 'discover'];
    let randomBank = Math.floor(Math.random() * cardTypes.length);

    if (ccType === 4) {
        cardType = cardTypes[0];
    } else if (ccType >= 51 && ccType <= 55) {
        cardType = cardTypes[1];
    } else if (ccType === 34 || ccType === 37) {
        cardType = cardTypes[2];
    } else if (ccType === 6011 || ccType === 644) {
        cardType = cardTypes[3];
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

function randomDateNameCVC(){
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