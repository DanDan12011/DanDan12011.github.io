
document.addEventListener("DOMContentLoaded", function () {
    // Accessing elements
    const totalAmountInput = document.getElementById("totalamount");
    const monthsInput = document.getElementById("months");
    const submitButton = document.getElementById("submit");

    // Adding click event listener
    submitButton.addEventListener("click", calculateBudget);

    // Function to calculate the budget
    function calculateBudget() {
        const totalAmount = parseFloat(totalAmountInput.value.replace(/,/g, ''));
        const numberOfMonths = parseInt(monthsInput.value);

        if (!isNaN(totalAmount) && !isNaN(numberOfMonths) && numberOfMonths > 0) {
            const monthlyBudget = totalAmount / numberOfMonths;
            alert("Your monthly budget is: $" + monthlyBudget.toFixed(2));
        } else {
            alert("Please enter valid values for total amount and number of months.");
        }
    }
});
