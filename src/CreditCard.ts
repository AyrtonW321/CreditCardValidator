function btnCheckCCNumber() {
    const inputElement = document.getElementById('txt-cc-number') as HTMLInputElement;
    if (inputElement) {
        const CC = inputElement.value;
        console.log(CC);
        return CC;
    }
    return null;
}