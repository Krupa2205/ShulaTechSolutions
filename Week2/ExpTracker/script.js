document.addEventListener("DOMContentLoaded", function () {
    const expenseName = document.getElementById("expenseName");
    const expenseAmount = document.getElementById("expenseAmount");
    const expenseCategory = document.getElementById("expenseCategory");
    const addExpenseBtn = document.getElementById("addExpense");
    const expensesList = document.getElementById("expenses");
    const darkModeToggle = document.getElementById("darkModeToggle");
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    function updateUI() {
        expensesList.innerHTML = "";
        expenses.forEach((expense, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${expense.name} - ₹${expense.amount} (${expense.category})
                <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
            `;
            expensesList.appendChild(li);
        });
        updateChart();
    }

    window.editExpense = (index) => {
        const expense = expenses[index];
        expenseName.value = expense.name;
        expenseAmount.value = expense.amount;
        expenseCategory.value = expense.category;
        deleteExpense(index);
    };

    window.deleteExpense = (index) => {
        expenses.splice(index, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        updateUI();
    };

    addExpenseBtn.addEventListener("click", () => {
        const name = expenseName.value.trim();
        const amount = parseFloat(expenseAmount.value);
        const category = expenseCategory.value;

        if (name && !isNaN(amount)) {
            expenses.push({ name, amount, category });
            localStorage.setItem("expenses", JSON.stringify(expenses));
            expenseName.value = "";
            expenseAmount.value = "";
            updateUI();
        }
    });

    let expenseChart;
    function updateChart() {
        const ctx = document.getElementById("expenseChart").getContext("2d");
        if (expenseChart) expenseChart.destroy();

        const categories = {};
        expenses.forEach(exp => {
            categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
        });

        expenseChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: Object.keys(categories),
                datasets: [{
                    data: Object.values(categories),
                    backgroundColor: ["#D69ADE", "#EABDE6", "#AA60C8", "#FFDFEF", "#A888B5"]
                }]
            }
        });
    }

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    updateUI();
});
