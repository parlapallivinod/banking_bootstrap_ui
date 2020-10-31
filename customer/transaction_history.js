let logoutButton;
let previousPageButton;
let pageNumberInput;
let pageSizeSelect;
let transacionDescSpan;
let nextPageButton;

let transactionsDiv;
let transactionsBody;
let noTransactionsFoundDiv;


function handlePageSize() {
    pageNumberInput.value = 0;

    let page = {
        "pageNumber": pageNumberInput.value,
        "pageSize": pageSizeSelect.value
    }
    console.log("page");
    console.log(page);
    postGetTransactions(page);
}

function handlePreviousPage() {
    let page = {
        "pageNumber": parseInt(pageNumberInput.value) - 1,
        "pageSize": pageSizeSelect.value
    }
    console.log("page");
    console.log(page);
    postGetTransactions(page);
}

function handleNextPage() {
    let page = {
        "pageNumber": parseInt(pageNumberInput.value) + 1,
        "pageSize": pageSizeSelect.value
    }
    console.log("page");
    console.log(page);
    postGetTransactions(page);
}

function handleTransactionsData(transactionsMap) {
    console.log("In handleTransactionsData(transactionsMap)");
    console.log(transactionsMap);
    
    let pageNumber = parseInt(transactionsMap.pageNumber);
    console.log("pageNumber: " + pageNumber);
    let totalPages = parseInt(transactionsMap.totalPages);
    console.log("totalPages: " + totalPages);
    let pageSize = parseInt(transactionsMap.pageSize);
    console.log("pageSize: " + pageSize);
    let numberOfTransactions = parseInt(transactionsMap.numberOfTransactions);
    console.log("numberOfTransactions: " + numberOfTransactions);
    let totalTransactions = parseInt(transactionsMap.totalTransactions);
    console.log("totalTransactions: " + totalTransactions);


    if (totalPages != 0 && pageNumber + 1 < totalPages) {
        nextPageButton.disabled = false;
    } else {
        nextPageButton.disabled = true;
    }

    if (numberOfTransactions != 0) {
        pageNumberInput.value = pageNumber;
    }

    let temp = "";
    if (numberOfTransactions != 0) {
        temp = ((pageNumber * pageSize) + 1) 
                + " to " 
                + ((pageNumber * pageSize) + numberOfTransactions) 
                + " of " 
                + totalTransactions 
                + " transactions ("
                + (pageNumber + 1)
                + " of "
                + totalPages
                + " pages)";
    }
    console.log(temp);
    transacionDescSpan.innerText = temp;

    if (totalPages != 0 && pageNumber != 0) {
        previousPageButton.disabled = false;
    } else {
        previousPageButton.disabled = true;
    }

    if (numberOfTransactions == 0){
        transactionsDiv.style.display = "none";
        noTransactionsFoundDiv.style.display = "block";
    } else {
        transactionsDiv.style.display = "block";
        noTransactionsFoundDiv.style.display = "none";
    }

    transactionsBody.innerHTML = "";
    if (numberOfTransactions != 0) {
        let transactions = transactionsMap.transactions;
        for (let i = 0; i < transactions.length; i++) {
            //console.log(i);
            let tr = document.createElement('tr');

            let idTd = document.createElement('td');
            idTd.innerText = transactions[i].id;
            tr.append(idTd);

            let typeTd = document.createElement('td');
            typeTd.innerText = transactions[i].type;
            tr.append(typeTd);

            let amountTd = document.createElement('td');
            amountTd.innerText = transactions[i].amount;
            tr.append(amountTd);

            let fromUserTd = document.createElement('td');
            fromUserTd.innerText = transactions[i].fromUser != null? transactions[i].fromUser.username: "";
            tr.append(fromUserTd);

            let toUserTd = document.createElement('td');
            toUserTd.innerText = transactions[i].toUser != null? transactions[i].toUser.username: "";
            tr.append(toUserTd);

            let createdTimeTd = document.createElement('td');
            createdTimeTd.innerText = transactions[i].createdTime;
            tr.append(createdTimeTd);

            let statusTd = document.createElement('td');
            statusTd.innerText = transactions[i].status;
            tr.append(statusTd);

            let messageTd = document.createElement('td');
            messageTd.innerText = transactions[i].message;
            tr.append(messageTd);

            transactionsBody.append(tr); 
        }
    }
}

async function postGetTransactions(page) {
    showLoadingSpinner();

    let response = await getTransactions(page);
    console.log("response");
    console.log(response)

    if (response.status == 200) {
        let transactionsMap = response.data;
        handleTransactionsData(transactionsMap);
    } else if (response.status == 600) {
        showMessage(message, response.data, "FAILURE");
    } else {
        showMessage(message, response.data.message + "<br/>" + response.data.details, "FAILURE");
    }

    hideLoadingSpinner();
}

window.onload = function() {
    if (!isUserLoggedIn())
        window.location.href = BANKING_LOGIN_UI;
    
    logoutButton = document.querySelector("#logoutButton");
    console.log("logoutButton");
    console.log(logoutButton);
    logoutButton.onclick = logOutUser;

    previousPageButton = document.querySelector("#previousPageButton");
    console.log("previousPageButton");
    console.log(previousPageButton);
    previousPageButton.onclick = handlePreviousPage;

    pageNumberInput = document.querySelector("#pageNumberInput");
    console.log("pageNumberInput");
    console.log(pageNumberInput);

    pageSizeSelect = document.querySelector("#pageSizeSelect");
    console.log("pageSizeSelectSize");
    console.log(pageSizeSelect);
    pageSizeSelect.onchange = handlePageSize;

    transacionDescSpan = document.querySelector("#transacionDescSpan");
    console.log("transacionDescSpan");
    console.log(transacionDescSpan);

    nextPageButton = document.querySelector("#nextPageButton");
    console.log("nextPageButton");
    console.log(nextPageButton);
    nextPageButton.onclick = handleNextPage;

    transactionsDiv = document.querySelector("#transactionsDiv");
    console.log("transactionsDiv");
    console.log(transactionsDiv);

    transactionsBody = document.querySelector("#transactionsBody");
    console.log("transactionsBody");
    console.log(transactionsBody);

    noTransactionsFoundDiv = document.querySelector("#noTransactionsFoundDiv");
    console.log("noTransactionsFoundDiv");
    console.log(noTransactionsFoundDiv);

    handlePageSize();
}