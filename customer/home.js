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
    } else {
        console.log("Failure");
    }
}

window.onload = function() {
    if (!isUserLoggedIn())
        window.location.href = BANKING_LOGIN_UI;
    
    logoutButton = document.querySelector("#logoutButton");
    console.log("logoutButton");
    console.log(logoutButton);

    logoutButton.onclick = logOutUser;

    getAccountDetails();
}