function checkForName(userInput) {
    console.log("::: Running checkForName :::", userInput);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    if(names.includes(userInput)) {
        alert("Welcome, Captain!")
    }
}

export { checkForName }
