function btnCheckCCNumber() {
    const inputElement = document.getElementById('txt-cc-number') as HTMLInputElement;
    console.log(inputElement);
    if (inputElement) {
        const CC = inputElement.value;
        return CC;
    }
    return null;
}

console.log(btnCheckCCNumber());