
// This simply waits until the webpage is fully loaded to start the code
document.addEventListener("DOMContentLoaded", function () {
    



    // Accessing elements
    //document.getElementById allows to grab whatevers inside of an id, "totalamount" would take whatever is inside of that input, such as a number
    
    const totalAmountInput_adv = document.getElementById("totalamount_adv");
    const monthsInput_adv = document.getElementById("months_adv");
    const submitButton_adv = document.getElementById("submit_adv");
    let percent_pool_display = document.getElementById('percent_pool');
    
    // Adding event listner
    //this allows a function to play when the user inputs something
    totalAmountInput_adv.addEventListener('input',calculateBudget_adv);
    monthsInput_adv.addEventListener('input',calculateBudget_adv);
    const submit_btn = document.getElementById('submit');
    submit_btn.addEventListener('click',calculate_percents);
    let totalAmount_adv = 0;
    let numberOfMonths_adv = 0;
    let monthlyBudget_adv = 0;
    let spendingAmount = 0;
    let spendingAmount_total = 0;
    let saved_cat_budget = [];
    let months_left_num = 0;
    
    
    

    // Function to calculate the budget
    function calculateBudget_adv() {

        totalAmount_adv = parseFloat(totalAmountInput_adv.value.replace(/,/g, ''));
        numberOfMonths_adv = parseInt(monthsInput_adv.value);

        if (!isNaN(totalAmount_adv) && !isNaN(numberOfMonths_adv) && numberOfMonths_adv > 0) {
            monthlyBudget_adv = totalAmount_adv / numberOfMonths_adv;
            
            budgetdisplay_adv(totalAmount_adv, monthlyBudget_adv, numberOfMonths_adv);
            
        } else {
            totalAmount_adv = 0;
            numberOfMonths_adv = 0;
            monthlyBudget_adv = 0;
            budgetdisplay_adv(totalAmount_adv, monthlyBudget_adv, numberOfMonths_adv);
        }

}


   
    
    let categoryBudgets = [];
    
    function calculate_percents(){
        
        const initial_percentage_pool = 0;
        let remaining_percent_pool = initial_percentage_pool;
    
        //empty array for category budgets
        const table = document.getElementById('tablerows');
        const rowcount = table.rows.length;
        const budget_view = document.getElementById('final_budget');
        const spending_display = document.getElementById('spending_inputs');
        categoryBudgets = [];
        saved_cat_budget = [];
    
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

                saved_cat_budget.push({
                    category,
                    percentage
                });

                remaining_percent_pool += percentage;
                console.log('CALCULATE PERCENTS');
                console.log('index: ' + i + ' Category: ' + category + ' Percent: ' + percentage);
                console.log('index: ' + i + ' Percent_pool: ' + remaining_percent_pool);
                
                if(remaining_percent_pool <= 100){
                    spending_display.innerHTML = '';
                    budget_view.innerHTML = '';
                    categoryBudgets.forEach(categoryBudget => {
                        const categoryElement = document.createElement('div');
                        categoryElement.textContent = `${categoryBudget.category}: $${(categoryBudget.budget.toFixed(2))}`;
                        categoryElement.id = `div_${categoryBudget.category}`;
                        const spendingInput = document.createElement('input');
                        spendingInput.placeholder = `Spendings for ${categoryBudget.category}`;
                        spendingInput.id = `input_for_${categoryBudget.category}`;
                        spending_display.appendChild(spendingInput);
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

    
    const submit_spending_button = document.getElementById('submit_spendings');
    submit_spending_button.addEventListener('click', submitSpendings);
    
    

    

    function submitSpendings() {
        const spendingList = document.getElementById('spending_inputs');
        const spendingInputs = spendingList.querySelectorAll('[id^="input_for_"]');
        const budgetView = document.getElementById('final_budget');

        spendingInputs.forEach(spendingInput => {
            const categoryId = spendingInput.id.replace('input_for_', ''); // Extract category ID
            const categoryBudgetElement = document.getElementById(`div_${categoryId}`);
            
            // Check if the corresponding budget element exists
            if (categoryBudgetElement) {
                const categoryBudget = parseFloat(categoryBudgetElement.textContent.replace(/[^\d.-]/g, '')); // Extract budget amount
                
                

                if(spendingInput.value.trim() !== ''){
                    spendingAmount = parseFloat(spendingInput.value.replace(/,/g, ''));
                    spendingAmount_total = spendingAmount_total + spendingAmount;
                    console.log('SUBMIT SPENDING');
                    console.log('spendingamount_total: ' + spendingAmount_total + ' spendingamount: ' + spendingAmount);
                }

                budgetdisplay_adv(totalAmount_adv, monthlyBudget_adv, numberOfMonths_adv);
                const newBudget = categoryBudget - spendingAmount;
                
            
                categoryBudgetElement.textContent = `${categoryId}: $${newBudget.toFixed(2)}`;
                spendingInput.value = '';
                spendingAmount = 0;
                
            }
        });
    }

    const reset_spending_button = document.getElementById('reset_spendings');
    reset_spending_button.addEventListener('click', resetspendings);

    function resetspendings(){
        spendingAmount_total = 0;
        budgetdisplay_adv(totalAmount_adv, monthlyBudget_adv, numberOfMonths_adv);
        calculate_percents();
    }


    
    const next_month_button = document.getElementById('next_month');
    next_month_button.addEventListener('click',nextmonth);
    function nextmonth(){
        if ((numberOfMonths_adv - months_left_num) <= 1) {
            months_left_num = 0;
            numberOfMonths_adv = 0;
            alert('Last month reached');
        }
        else {
            totalAmount_adv = totalAmount_adv - spendingAmount_total;
            months_left_num ++;
            spendingAmount_total = 0;
            console.log('total: ' + totalAmount_adv);
            console.log('months: ' + numberOfMonths_adv);
            budgetdisplay_adv(totalAmount_adv,monthlyBudget_adv,numberOfMonths_adv);
            resetspendings();
        
        }
        

    }

    

        



        
    

    function budgetdisplay_adv(totalAmount_adv, monthlyBudget_adv, numberOfMonths_adv){
        const total_adv = document.getElementById('totalamount_budget_adv');
        const budget_adv = document.getElementById("monthly_budgetdisplay_adv");
        const months_left = document.getElementById('months_left');
        const categoryBudgets = document.getElementById('final_budget');
        
        console.log('monthlybudg: ' + monthlyBudget_adv + ' spendings: ' + spendingAmount_total);
        const updatedmonthly_budg = monthlyBudget_adv -= spendingAmount_total;
        console.log('new monthly budget: ' + updatedmonthly_budg);

        if(!isNaN(monthlyBudget_adv)){
            total_adv.textContent = "Total Budget: $" + (totalAmount_adv - spendingAmount_total).toFixed(2);
            budget_adv.textContent = "Monthly Budget: $" + updatedmonthly_budg.toFixed(2);
            months_left.textContent = "Months Left: " + (numberOfMonths_adv - months_left_num);

        }

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
            const spending_inputs_rows = document.getElementById('spending_inputs');
            const lastdiv = budget_categories.lastChild;
            const lastdiv2 = spending_inputs_rows.lastChild;
            

            // Remove the last row
            table.deleteRow(lastRowIndex);

            if (lastdiv) {
                budget_categories.removeChild(lastdiv);
                spending_inputs_rows.removeChild(lastdiv2);
            }
            
            calculate_percents();
            resetspendings();
        } else {
            alert('Cannot delete the last row. There must be at least one row.');
        }
    }

    const resetrowsbutton = document.getElementById('resetrows');
    resetrowsbutton.addEventListener('click',resetrows);

    function resetrows(){
        const table = document.getElementById('tablerows');
        const budget_categories = document.getElementById('final_budget');
        const spending_display = document.getElementById('spending_inputs');

        

        while (table.rows.length > 1){
            table.deleteRow(1);
        }
        budget_categories.innerHTML = '';
        spending_display.innerHTML = '';
        remaining_percent_pool = 0;
        percent_pool_display.textContent = "%";
        saved_cat_budget = [];


        let categoryInput = document.getElementById('category_1');
        let percentInput = document.getElementById('category_percentage_1');
        let totalAmount_adv = document.getElementById('totalamount_adv');
        let numberOfMonths_adv = document.getElementById('months_adv');
        categoryInput.value = '';
        percentInput.value = '';
        totalAmount_adv.value = '';
        numberOfMonths_adv.value = '';
        monthlyBudget_adv.value = '';
        totalAmountInput_adv.value = '';
        monthsInput_adv.value = '';

        spendingAmount_total = 0;
        totalAmount_adv = 0;
        numberOfMonths_adv = 0;
        monthlyBudget_adv = 0;
        months_left_num = 0;
        budgetdisplay_adv(totalAmount_adv, monthlyBudget_adv, numberOfMonths_adv);

        



        
    }
    


    const save_button = document.getElementById('save');
    save_button.addEventListener('click',saveData);
    

    function saveData(){
        
        const table = document.getElementById('tablerows');
        const rowcount = table.rows.length;
        localStorage.setItem('totalAmount_adv', totalAmountInput_adv.value);
        localStorage.setItem('numberOfMonths_adv', monthsInput_adv.value);
        localStorage.setItem('monthlyBudget_adv', monthlyBudget_adv.toFixed(2));
        localStorage.setItem('saved_cat_budget', JSON.stringify(saved_cat_budget));
        localStorage.setItem('table_row_length',rowcount);
        localStorage.setItem('months_left_num',months_left_num);
        localStorage.setItem('money_spent',parseInt(spendingAmount_total));
        console.log('SAVED DATA: ' + 'totalAmount_adv = ' + totalAmount_adv + ' numberofMonths_adv = ' + numberOfMonths_adv + ' monthlyBudget_adv = ' + monthlyBudget_adv +  ' spent_money: ' + spendingAmount_total + ' budget ' + JSON.stringify(saved_cat_budget));
        alert('Saved Budget');


    }

    const load_button = document.getElementById('load');
    load_button.addEventListener('click',loadData);

    function loadData(){
        saved_cat_budget = [];
        remaining_percent_pool = 0;
        totalAmount_adv = parseFloat(localStorage.getItem('totalAmount_adv')) || 0;
        numberOfMonths_adv = parseInt(localStorage.getItem('numberOfMonths_adv')) || 0;
        monthlyBudget_adv = parseInt(localStorage.getItem('monthlyBudget_adv')) || 0;
        saved_cat_budget = JSON.parse(localStorage.getItem('saved_cat_budget')) || [];
        spendingAmount_total = parseInt(localStorage.getItem('money_spent')) || 0;
        months_left_num = localStorage.getItem('months_left_num') || 0;
        const rowcount = localStorage.getItem('table_row_length');

        for (let i = 1; i < rowcount; i++){
            addrow();
        }

        for (let i = 0; i < rowcount; i++){
            const categoryInput = document.getElementById(`category_${i+1}`);
            const percentInput = document.getElementById(`category_percentage_${i+1}`);
            const category = categoryInput.value;
            const percentage = parseFloat(percentInput.value);
            categoryInput.value = saved_cat_budget[i].category;
            percentInput.value = saved_cat_budget[i].percentage;
            
            console.log('LOADED: ' + categoryInput.value + '['+i+']' + percentInput.value +'['+i+']'+ ' row: ' + i);

        }

        totalAmountInput_adv.value = totalAmount_adv;
        monthsInput_adv.value = numberOfMonths_adv;
        calculateBudget_adv();
        calculate_percents();
        console.log('LOADED DATA: ' + ' Tot: ' + totalAmount_adv + ' Months: ' + numberOfMonths_adv + ' month budg: ' + monthlyBudget_adv + ' spent_money: ' + spendingAmount_total + ' saved_cats: ' + JSON.stringify(saved_cat_budget) + ' Percent_pool: ' + remaining_percent_pool);
        
    }

    const reset_save_button = document.getElementById('reset_save');
    reset_save_button.addEventListener('click',resetData);

    function resetData(){
        localStorage.removeItem('totalAmount_adv');
        localStorage.removeItem('numberOfMonths_adv');
        localStorage.removeItem('monthlyBudget_adv');
        localStorage.removeItem('saved_cat_budget');
        localStorage.removeItem('table_row_length');
        localStorage.removeItem('months_left_num');
        localStorage.removeItem('money_spent');
        spendingAmount_total = 0;
        loadData();
        
        console.log('RESET DATA');
        console.log('totalAmount_adv = ' + totalAmount_adv + ' numberofMonths_adv = ' + numberOfMonths_adv + ' monthlyBudget_adv = ' + monthlyBudget_adv + ' budget ' + JSON.stringify(saved_cat_budget));
    }


    
    loadData();
});
