let logoutButton;

async function getAccountDetails() {
    let accountDetailsResponse = await accountDetails();
    console.log("accountDetailsResponse");
    console.log(accountDetailsResponse)
    
    if (accountDetailsResponse.status == 200) {
        console.log("Success");
                
        let username = document.querySelector("#username");
        username.innerHTML = accountDetailsResponse.data.username;

        let balance = document.querySelector("#balance");
        balance.innerHTML = accountDetailsResponse.data.balance;
    } else if (response.status == 500) {
        console.log("failure");
        showMessage(message, response.data, "FAILURE");
    } else {
        console.log("Failure");
        showMessage(message, response.data, "FAILURE");
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