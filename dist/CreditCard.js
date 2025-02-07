"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function btnCheckCCNumber() {
    const inputElement = document.getElementById('txt-cc-number');
    if (inputElement) {
        const CC = inputElement.value;
        console.log(CC);
        return CC;
    }
    return null;
}
//# sourceMappingURL=CreditCard.js.map