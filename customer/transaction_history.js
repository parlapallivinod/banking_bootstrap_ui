let logoutButton;

async function getHome() {
    let homeResponse = await home();
    console.log("homeResponse");
    console.log(homeResponse)
   
    if (homeResponse.status == 200) {
        console.log("Success");
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
}