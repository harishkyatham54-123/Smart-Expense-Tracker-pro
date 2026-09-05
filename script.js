let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

let editIndex = -1;

const titleInput =
document.getElementById("title");

const amountInput =
document.getElementById("amount");

const typeInput =
document.getElementById("type");

const transactionList =
document.getElementById("transactionList");

const incomeEl =
document.getElementById("income");

const expenseEl =
document.getElementById("expense");

const balanceEl =
document.getElementById("balance");

const searchInput =
document.getElementById("search");

const filterInput =
document.getElementById("filter");

const addBtn =
document.getElementById("addBtn");

const themeBtn =
document.getElementById("themeBtn");


function saveData() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}


function addTransaction() {

    const title =
    titleInput.value.trim();

    const amount =
    Number(amountInput.value);

    const type =
    typeInput.value;

    if(title === "" || amount <= 0){

        alert("Enter valid details");

        return;
    }

    const transaction = {

        title,
        amount,
        type

    };


    if(editIndex === -1){

        transactions.push(transaction);

    }
    else{

        transactions[editIndex] =
        transaction;

        editIndex = -1;

        addBtn.textContent =
        "Add Transaction";

    }


    saveData();

    updateUI();


    titleInput.value = "";

    amountInput.value = "";

}


function deleteTransaction(index){

    transactions.splice(index, 1);

    saveData();

    updateUI();

}


function editTransaction(index){

    const item =
    transactions[index];


    titleInput.value =
    item.title;

    amountInput.value =
    item.amount;

    typeInput.value =
    item.type;


    editIndex =
    index;


    addBtn.textContent =
    "Update Transaction";

}


function updateUI(){

    transactionList.innerHTML = "";


    // Calculate overall income and expense

    let income = 0;

    let expense = 0;


    transactions.forEach((item) => {

        if(item.type === "Income"){

            income += item.amount;

        }
        else{

            expense += item.amount;

        }

    });


    // Get search and filter values

    let searchText =
    searchInput.value.toLowerCase();

    let filterValue =
    filterInput.value;


    // Display transactions

    transactions.forEach((item, index) => {


        // Search filter

        if(
            !item.title
            .toLowerCase()
            .includes(searchText)
        ){

            return;

        }


        // Type filter

        if(
            filterValue !== "All" &&
            item.type !== filterValue
        ){

            return;

        }


        const li =
        document.createElement("li");


        li.innerHTML = `

        <div>

            <strong>
                ${item.title}
            </strong>

            <br>

            ₹${item.amount}
            (${item.type})

        </div>


        <div class="action-buttons">

            <button
            class="edit-btn"
            onclick="editTransaction(${index})">

                Edit

            </button>


            <button
            class="delete-btn"
            onclick="deleteTransaction(${index})">

                Delete

            </button>

        </div>

        `;


        transactionList.appendChild(li);

    });


    // Display overall totals

    incomeEl.textContent =
    "₹" + income;


    expenseEl.textContent =
    "₹" + expense;


    balanceEl.textContent =
    "₹" + (income - expense);

}


addBtn.addEventListener(
    "click",
    addTransaction
);


searchInput.addEventListener(
    "input",
    updateUI
);


filterInput.addEventListener(
    "change",
    updateUI
);


themeBtn.addEventListener(
    "click",
    () => {

        document.body
        .classList
        .toggle("dark");

    }
);


updateUI();
