let logoutButton;
let message;
let type;
let toUser;
let toUserFormGroup 
let newTransactionForm;

function changeType(event) {
    let transactionType = event.target.value;
    console.log("transactionType: "+ event.target.value);
    
    toUser.value = "";
    if (transactionType == "Choose..." ) {
        //console.log("choose");
        toUserFormGroup.style.display = "none";
    } else if (transactionType == "DEPOSIT") {
        //console.log("deposit");
        toUserFormGroup.style.display = "block";  
    } else if (transactionType == "WITHDRAW") {
        //console.log("withdraw");
        toUserFormGroup.style.display = "none";
    } else if (transactionType == "TRANSFER") {
        //console.log("transfer");
        toUserFormGroup.style.display = "block";
    }
}

function clearNewTransactionForm() {
    document.querySelector("#amount").value = "";
    document.querySelector("#type").value = "Choose...";
    document.querySelector("#toUser").value = "";
    toUserFormGroup.style.display = "none";
}

async function postPerformTransaction() {

    let amount = document.querySelector("#amount").value;
    console.log("amount: " + amount);
    let type = document.querySelector("#type").value
    console.log("type: " + type);
    let toUser = document.querySelector("#toUser").value
    console.log("toUser: " + toUser);

    if (type == "Choose...") {
        console.log("Please select a Transaction Type");
        showMessage(message, "Please select a Transaction Type", "FAILURE");
        return;
    }

    let transaction = {
        "amount": amount,
        "type": type
    };

    if (type == "TRANSFER" || (type == "DEPOSIT" && toUser != "")) {
        transaction.toUser = {};
        transaction.toUser.username = toUser;
    }
    console.log("transaction");
    console.log(transaction);

    let response = await performTransaction(transaction);
    console.log("response");
    console.log(response)
   
    if (response.status == 201) {
        console.log("Success");
        if(response.data.status == "SUCCESS") {
            showMessage(message, "Transaction successful", "SUCCESS");
            clearNewTransactionForm();
        } else if(response.data.status == "FAILURE") {
            showMessage(message, "Transaction failed. " + response.data.message, "FAILURE");
        }
    } else if (response.status == 400) {
        console.log("400 failure");
        showMessage(message, response.data.message + "<br/>" + response.data.details, "FAILURE");
    } else if (response.status == 500) {
        console.log("500 failure");
        showMessage(message, response.data, "FAILURE");
    } else {
      console.log("else failure");
      showMessage(message, response.data.message + "<br/>" + response.data.details, "FAILURE");
    }
}

window.onload = function() {
    if (!isUserLoggedIn())
        window.location.href = BANKING_LOGIN_UI;
    
    logoutButton = document.querySelector("#logoutButton");
    console.log("logoutButton");
    console.log(logoutButton);
    logoutButton.onclick = logOutUser;

    message = document.querySelector("#message");
    console.log("message");
    console.log(message);

    type = document.querySelector("#type");
    console.log("type");
    console.log(type);
    type.addEventListener("change", changeType);

    toUser = document.querySelector("#toUser");
    console.log("toUser");
    console.log(toUser);
    
    toUserFormGroup = document.querySelector("#toUserFormGroup");
    console.log("toUserFormGroup");
    console.log(toUserFormGroup);

    newTransactionForm = document.querySelector("#newTransactionForm");
    console.log("newTransactionForm");
    console.log(newTransactionForm);

    newTransactionForm.onsubmit = async function(event) {
        event.preventDefault();
        showLoadingSpinner();
        await postPerformTransaction();
        hideLoadingSpinner();
    }

}