

// This simply waits until the webpage is fully loaded to start the code
document.addEventListener("DOMContentLoaded", function () {



    //page elements for simple and advanced

    const simpleview = document.getElementById('simpleview');
    const advancedview = document.getElementById('advancedview');
    const simplebutton = document.getElementById('simple');
    const advancedbutton = document.getElementById('advanced');

    simplebutton.addEventListener("click",showsimpleview);
    advancedbutton.addEventListener("click",showadvancedview);

    function showsimpleview(){
        simpleview.style.display = 'block';
        advancedview.style.display = 'none';
    }

    function showadvancedview() {
        simpleview.style.display = 'none';
        advancedview.style.display = 'block';
    }

    showsimpleview();
    


    // Accessing elements
    //document.getElementById allows to grab whatevers inside of an id, "totalamount" would take whatever is inside of that input, such as a number
    
    const totalAmountInput = document.getElementById("totalamount");
    const monthsInput = document.getElementById("months");
    const submitButton = document.getElementById("submit");
    
    // Adding click event listener
    //this allows a function to play when the user clicks the submit button
    submitButton.addEventListener("click", calculateBudget);

    // Function to calculate the budget
    function calculateBudget() {
        const totalAmount = parseFloat(totalAmountInput.value.replace(/,/g, ''));
        const numberOfMonths = parseInt(monthsInput.value);

        if (!isNaN(totalAmount) && !isNaN(numberOfMonths) && numberOfMonths > 0) {
            const monthlyBudget = totalAmount / numberOfMonths;
            
            budgetdisplay(monthlyBudget);

            // saveToLocalStorage(totalAmount,numberOfMonths);



        } else {
            alert("Please enter valid values for total amount and number of months.");
        }

    }


    function budgetdisplay(monthlyBudget){
        const budget = document.getElementById("budgetdisplay");

        budget.textContent = "Monthly Budget: " + monthlyBudget.toFixed(2);

    }



    
    
});
