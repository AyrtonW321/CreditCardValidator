function btnCheckCCNumber() {
    const inputElement = document.getElementById("txt-cc-number") as HTMLInputElement;
    const outputParagraph = document.getElementById("info-paragraph") as HTMLInputElement;
    outputParagraph.innerHTML = "";
    const infoContainer = document.getElementById("info-container") as HTMLDivElement;
    infoContainer.style.display = "none";
    if (inputElement) {
        const CC: number[] = inputElement.value.split("").map(Number);
        if (CC.length == 16) {
            checkCCNumber(CC);
            checkCCDetails(CC);
        } else {
            infoContainer.style.display = "block";
            outputParagraph.innerHTML += "Please enter a valid 16-digit credit card number.";
        }
    }
}

function checkCCNumber(ccNumber: number[]): boolean {
    const outputParagraph = document.getElementById(
        "info-paragraph"
    ) as HTMLInputElement;
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

function makeCCNumber() {
    let newCC: number[] = [];
    let LuhnSum: number = 0;
    const outputParagraph = document.getElementById(
        "card-number"
    ) as HTMLInputElement;
    outputParagraph.innerHTML = "";
    for (let i = 0; i < 15; i++) {
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
        return makeCCNumber();
    } else {
        newCC.push(lastDigit);
        LuhnSum += lastDigit;
    }
    if (LuhnSum % 10 !== 0) {
        return makeCCNumber();
    }
    const newCCNumber = newCC
        .join("")
        .replace(/(\d{4})/g, "$1-")
        .slice(0, -1);
    outputParagraph.innerHTML = newCCNumber;

    console.log("Generated credit card number: " + newCCNumber);
    console.log("Luhn sum:", LuhnSum);
    console.log("Generated CC:", newCC);
    return newCCNumber;
}

function checkCCDetails(ccNumber: number[]) {
    const outputParagraph = document.getElementById(
        "info-paragraph"
    ) as HTMLParagraphElement;
    const infoContainer = document.getElementById(
        "info-container"
    ) as HTMLDivElement;

    outputParagraph.innerHTML = "Info about the credit card number:" + "<br>";

    console.log(ccNumber);

    let firstDigitInfo: string[] = [
        "Airlines",
        "Airlines",
        "Travel and Entertainment",
        "Banking and Financial",
        "Banking and Financial",
        "Merchandising and Banking",
        "Petroleum",
        "Healthcare and Telecommunications",
        "National Assignment",
    ];

    let firstDigit: number = ccNumber[0];

    let first6Digits: number[] = ccNumber.slice(0, 6);

    let first7To15Digits: number[] = ccNumber.slice(6, 15);

    console.log("First digit:", firstDigit);
    console.log("First 6 digits:", first6Digits);
    console.log("Digits 7-15:", first7To15Digits);

    outputParagraph.innerHTML +=
        "This card was issued for the " +
        firstDigitInfo[firstDigit - 1] +
        " industry" +
        "<br>";

    if (first6Digits[0] === 4) {
        outputParagraph.innerHTML += "This is a Visa card" + "<br>";
    } else if (
        first6Digits[0] === 5 &&
        first6Digits[1] >= 1 &&
        first6Digits[1] <= 5
    ) {
        outputParagraph.innerHTML += "This is a MasterCard" + "<br>";
    } else if (
        first6Digits[0] === 3 &&
        (first6Digits[1] === 4 || first6Digits[1] === 7)
    ) {
        outputParagraph.innerHTML += "This is an American Express card" + "<br>";
    } else if (first6Digits[0] === 6 && first6Digits[1] === 5) {
        outputParagraph.innerHTML += "This is a Discover card" + "<br>";
    } else if (
        first6Digits[0] === 6 &&
        first6Digits[1] === 0 &&
        first6Digits[2] === 1 &&
        first6Digits[3] === 1
    ) {
        outputParagraph.innerHTML += "This is a Discover card" + "<br>";
    } else if (
        first6Digits[0] === 6 &&
        first6Digits[1] === 4 &&
        first6Digits[2] === 4
    ) {
        outputParagraph.innerHTML += "This is a Discover card" + "<br>";
    } else if (
        JSON.stringify(first6Digits) === JSON.stringify([3, 7, 6, 2, 1, 1])
    ) {
        outputParagraph.innerHTML +=
            "This is a Singapore Airlines Krisflyer card" + "<br>";
    } else if (
        JSON.stringify(first6Digits) === JSON.stringify([5, 2, 9, 9, 6, 2])
    ) {
        outputParagraph.innerHTML +=
            "This is a pre-paid MuchMusic Mastercard" + "<br>";
    }

    outputParagraph.innerHTML +=
        "7 digits regarding your bank account number: " +
        first7To15Digits.join("") +
        "<br>";

    infoContainer.style.display = "block";
}