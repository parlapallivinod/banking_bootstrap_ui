let logoutButton;

async function getAccountDetails() {
    let accountDetailsResponse = await accountDetails();
    console.log("accountDetailsResponse");
    console.log(accountDetailsResponse)
    
    if (accountDetailsResponse.status == 200) {
        let username = document.querySelector("#username");
        username.innerText = accountDetailsResponse.data.username;

        let balance = document.querySelector("#balance");
        balance.innerText = accountDetailsResponse.data.balance;
    } else if (response.status == 600) {
        showMessage(message, response.data, "FAILURE");
    } else {
        showMessage(message, response.data.message + "<br/>" + response.data.details, "FAILURE");
    }
}

window.onload = async function() {
    if (!isUserLoggedIn())
        window.location.href = BANKING_LOGIN_UI;
    
    logoutButton = document.querySelector("#logoutButton");
    console.log("logoutButton");
    console.log(logoutButton);
    logoutButton.onclick = logOutUser;

    showLoadingSpinner();
    await getAccountDetails();
    hideLoadingSpinner();
}