let logoutButton;
let accountDeleteForm;
let accountDeleteButton;
let message;

async function postDeleteAccount() {
    let response = await deleteAccount();
    console.log("response");
    console.log(response);
   
    if (response.status == 204) {
        localStorage.removeItem("Authorization");
        console.log("Success");
        showMessage(message, response.data , "SUCCESS");
    } else if (response.status == 500) {
        console.log("Failure");
        showMessage(message, response.data, "FAILURE");
    } else {
        console.log("Failure");
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

    accountDeleteForm = document.querySelector("#accountDeleteForm");
    console.log("accountDeleteForm");
    console.log(accountDeleteForm);

    accountDeleteButton = document.querySelector("#accountDeleteButton");
    console.log("accountDeleteButton");
    console.log(accountDeleteButton);

    accountDeleteForm.onsubmit = async function(event) {
        event.preventDefault();
        showLoadingSpinner();
        await postDeleteAccount();
        hideLoadingSpinner();
    }
}