
// This simply waits until the webpage is fully loaded to start the code
document.addEventListener("DOMContentLoaded", function () {



    // Accessing elements
    //document.getElementById allows to grab whatevers inside of an id, "totalamount" would take whatever is inside of that input, such as a number
    
    const totalAmountInput_adv = document.getElementById("totalamount_adv");
    const monthsInput_adv = document.getElementById("months_adv");
    const submitButton_adv = document.getElementById("submit_adv");
    const percent_pool_display = document.getElementById('percent_pool');
    
    // Adding event listner
    //this allows a function to play when the user inputs something
    totalAmountInput_adv.addEventListener('input',calculateBudget_adv);
    monthsInput_adv.addEventListener('input',calculateBudget_adv);
    const submit_btn = document.getElementById('submit');
    submit_btn.addEventListener('click',calculate_percents);

    // Function to calculate the budget
    function calculateBudget_adv() {
        let totalAmount_adv = parseFloat(totalAmountInput_adv.value.replace(/,/g, ''));
        let numberOfMonths_adv = parseInt(monthsInput_adv.value);
       

        if (!isNaN(totalAmount_adv) && !isNaN(numberOfMonths_adv) && numberOfMonths_adv > 0) {
            const monthlyBudget_adv = totalAmount_adv / numberOfMonths_adv;
            
            budgetdisplay_adv(totalAmount_adv, monthlyBudget_adv, numberOfMonths_adv);
            
    } else {
        totalAmount_adv = 0;
        numberOfMonths_adv = 0;
        monthlyBudget_adv = 0;
        budgetdisplay_adv(totalAmount_adv, monthlyBudget_adv, numberOfMonths_adv);
    }

}


    

    function calculate_percents(){
        const totalAmount_adv = parseFloat(totalAmountInput_adv.value.replace(/,/g, ''));
        const numberOfMonths_adv = parseInt(monthsInput_adv.value);
        const monthlyBudget_adv = totalAmount_adv / numberOfMonths_adv;
        //sets percentage default to 100, since user hasnt inputted percentages yet for budgeting
        const initial_percentage_pool = 0;
        let remaining_percent_pool = initial_percentage_pool;

        //empty array for category budgets
        const categoryBudgets = [];
        const table = document.getElementById('tablerows');
        const rowcount = table.rows.length;
        const budget_view = document.getElementById('final_budget');
        
        const rowindex = rowcount;

    for (let i = 1; i <= rowcount; i++){
        console.log('rowcount: ' + rowcount);
        
        const categoryInput = document.getElementById(`category_${i}`);
        const percentInput = document.getElementById(`category_percentage_${i}`);
        console.log('category: ' + categoryInput.value + " Percent: " + percentInput.value);
        

        if (categoryInput && percentInput && categoryInput.value.trim() !== '' && percentInput.value.trim() !== '' && !isNaN(monthlyBudget_adv)) {
            const category = categoryInput.value;
            const percentage = parseFloat(percentInput.value);

            console.log(`Row ${i} - Category: ${category}, Percentage: ${percentage}`);

            categoryBudgets.push({
                category,
                budget: (percentage / 100) * monthlyBudget_adv
            });

            remaining_percent_pool += percentage;
            
            if(remaining_percent_pool <= 100){
            budget_view.innerHTML = '';
            categoryBudgets.forEach(categoryBudget => {
            const categoryElement = document.createElement('div');
            categoryElement.textContent = `${categoryBudget.category}: $${categoryBudget.budget.toFixed(2)}`;
            budget_view.appendChild(categoryElement);
            });
        }
        }
        
        
    }
    console.log('Percent Remaining %: ' + remaining_percent_pool);
    if(remaining_percent_pool <= 100){
    percent_pool_display.textContent = "%: " + remaining_percent_pool;
    }
    else {
        alert ('Cannot Exceed 100% of Budget');
    }

    }

        



        



    function budgetdisplay_adv(totalAmount_adv, monthlyBudget_adv, numberOfMonths_adv){
        const total_adv = document.getElementById('totalamount_budget_adv');
        const budget_adv = document.getElementById("monthly_budgetdisplay_adv");
        const months_left = document.getElementById('months_left');
        const categoryBudgets = document.getElementById('final_budget');

        total_adv.textContent = "Total Budget: $" + totalAmount_adv;
        budget_adv.textContent = "Monthly Budget: $" + monthlyBudget_adv.toFixed(2);
        months_left.textContent = "Months Left: " + numberOfMonths_adv;



    }

    


    //ADD ROWS BUTTON

    const addrowsbutton = document.getElementById('addrow').addEventListener('click',addrow);

    function addrow(){
        const table = document.getElementById('tablerows');

        if(table.rows.length >= 6){
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
        inputPercentage.id = 'category_percentage_' + table.rows.length;


        // Append input elements to the cells
        cell1.appendChild(inputCategory);
        cell2.appendChild(inputPercentage);
    }


    const deleterowbutton = document.getElementById('deleterow').addEventListener('click',deleterow);
    function deleterow(){
        const table = document.getElementById('tablerows');
        const rows = table.rows;

        // Ensure there is at least one row
        if (rows.length > 1) {
            // Get the index of the last row
            const lastRowIndex = rows.length - 1;
            const budget_categories = document.getElementById('final_budget');
            const lastdiv = budget_categories.lastChild;

            // Remove the last row
            table.deleteRow(lastRowIndex);
            if (lastdiv) {
                budget_categories.removeChild(lastdiv);
            }

        } else {
            alert('Cannot delete the last row. There must be at least one row.');
        }
    }

    const resetrowsbutton = document.getElementById('resetrows');
    resetrowsbutton.addEventListener('click',resetrows);

    function resetrows(){
        const table = document.getElementById('tablerows');
        const budget_categories = document.getElementById('final_budget');

        while (table.rows.length > 1){
            table.deleteRow(1);
        }
        budget_categories.innerHTML = '';
        remaining_percent_pool = 0;
        percent_pool_display.textContent = "%";


        let categoryInput = document.getElementById('category_1');
        let percentInput = document.getElementById('category_percentage_1');
        let totalAmount_adv = document.getElementById('totalamount_adv');
        let numberOfMonths_adv = document.getElementById('months_adv');
        let monthlyBudget_adv;
        categoryInput.value = '';
        percentInput.value = '';
        totalAmount_adv.value = '';
        numberOfMonths_adv.value = '';
        
        totalAmount_adv = 0;
        numberOfMonths_adv = 0;
        monthlyBudget_adv = 0;
        budgetdisplay_adv(totalAmount_adv, monthlyBudget_adv, numberOfMonths_adv);

        



        
    }
    



    
    
});
