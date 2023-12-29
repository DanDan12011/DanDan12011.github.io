

// This simply waits until the webpage is fully loaded to start the code
document.addEventListener("DOMContentLoaded", function () {



    //page elements for simple and advanced
    const simpleview = document.getElementById('simpleview');
    const advancedview = document.getElementById('advancedview');
    //simple page turns advanced button inactive
    const advancedbutton = document.getElementById('advanced_inactive');
    //adv page sets simple button inactive
    const simplebutton = document.getElementById('simple_inactive');

    //simple
    advancedbutton.addEventListener("click",showadvancedview);

    //adv
    simplebutton.addEventListener("click",showsimpleview);

    function showsimpleview(){
        simpleview.style.display = 'block';
        advancedview.style.display = 'none';
    }

    function showadvancedview() {
        simpleview.style.display = 'none';
        advancedview.style.display = 'block';
    }

    showsimpleview();
    

    //SIMPLE PAGE
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

    //ADVANCED PAGE
    // Accessing elements
    //document.getElementById allows to grab whatevers inside of an id, "totalamount" would take whatever is inside of that input, such as a number
    
    const totalAmountInput_adv = document.getElementById("totalamount_adv");
    const monthsInput_adv = document.getElementById("months_adv");
    const submitButton_adv = document.getElementById("submit_adv");
    
    // Adding click event listener
    //this allows a function to play when the user clicks the submit button
    submitButton_adv.addEventListener("click", calculateBudget_adv);

    // Function to calculate the budget
    function calculateBudget_adv() {
        const totalAmount_adv = parseFloat(totalAmountInput_adv.value.replace(/,/g, ''));
        const numberOfMonths_adv = parseInt(monthsInput_adv.value);

        if (!isNaN(totalAmount_adv) && !isNaN(numberOfMonths_adv) && numberOfMonths_adv > 0) {
            const monthlyBudget_adv = totalAmount_adv / numberOfMonths_adv;
            
            budgetdisplay_adv(monthlyBudget_adv);

            // saveToLocalStorage(totalAmount,numberOfMonths);



        } else {
            alert("Please enter valid values for total amount and number of months.");
        }

    }


    function budgetdisplay_adv(monthlyBudget_adv){
        const budget_adv = document.getElementById("budgetdisplay_adv");

        budget_adv.textContent = "Monthly Budget: " + monthlyBudget_adv.toFixed(2) + " (but advanced :>)";

    }


    //ADD ROWS BUTTON

    const addrowsbutton = document.getElementById('addrow').addEventListener('click',addrow);

    function addrow(){
        const table = document.getElementById('table');

        if(table.rows.length > 6){
            alert('Maximum amount of rows reached (6)');
            return;
        }
    

        // Create a new row
        const newRow = table.insertRow();
        newRow.id = 'row_' + table.rows.length;

        // Create cells for the new row
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);

        // Create input elements for the cells
        const inputCategory = document.createElement('input');
        const inputPercentage = document.createElement('input');

        // Set attributes for the input elements
        inputCategory.placeholder = 'Category';
        inputCategory.id = 'category_' + table.rows.length;

        inputPercentage.placeholder = 'Percentage';
        inputPercentage.id = 'category_percentage_' + table.rows.length -1;


        // Append input elements to the cells
        cell1.appendChild(inputCategory);
        cell2.appendChild(inputPercentage);
    }


    const deleterowbutton = document.getElementById('deleterow').addEventListener('click',deleterow);
    function deleterow(){
        const table = document.getElementById('table');
        const rows = table.rows;

        // Ensure there is at least one row
        if (rows.length > 2) {
            // Get the index of the last row
            const lastRowIndex = rows.length - 1;

            // Remove the last row
            table.deleteRow(lastRowIndex);
        } else {
            alert('Cannot delete the last row. There must be at least one row.');
        }
    }
    



    
    
});
