let logoutButton;
let passwordUpdationForm;
let passwordUpdateButton;
let message;

function clearPasswordUpdateForm() {
    document.querySelector("#password").value = "";
    document.querySelector("#newPassword").value = "";
    document.querySelector("#verifyNewPassword").value = "";
  }

async function postUpdateUserPassword() {
    let basicAuth = localStorage.getItem("Authorization");
    console.log("basicAuth");
    console.log(basicAuth);
    let username = atob(basicAuth.split(" ")[1]).split(":")[0];
    console.log("username: " + username);
    let userPassword = atob(basicAuth.split(" ")[1]).split(":")[1];
    console.log("userPassword: " + userPassword);

    let password = document.querySelector("#password").value;
    console.log("password: " + password);
    let newPassword = document.querySelector("#newPassword").value
    console.log("newPassword: " + newPassword);
    let verifyNewPassword = document.querySelector("#verifyNewPassword").value
    console.log("verifyNewPassword: " + verifyNewPassword);

    if (userPassword != password) {
        console.log("User password doesn't match");
        showMessage(message, "User password doesn't match", "FAILURE");
        return;
    }

    if (newPassword != verifyNewPassword) {
        console.log("New passwords don't match")
        showMessage(message, "New passwords don't match", "FAILURE");
        return;
    }

    let response = await updateUserPassword({"username": username, "password": newPassword});
    console.log("response");
    console.log(response);
  
    if (response.status == 200) {
        localStorage.setItem("Authorization", "Basic " + btoa(response.data.username + ":" + response.data.password));
        console.log("success");
        showMessage(message, 
            "Password updated successfully", 
            "SUCCESS");
            clearPasswordUpdateForm();
    } else {
      console.log("failure");
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

    passwordUpdationForm = document.querySelector("#passwordUpdationForm");
    console.log("passwordUpdationForm");
    console.log(passwordUpdationForm);

    passwordUpdateButton = document.querySelector("#passwordUpdateButton");
    console.log("passwordUpdateButton");
    console.log(passwordUpdateButton);

    passwordUpdationForm.onsubmit = function(event) {
        event.preventDefault();
        passwordUpdateButton.disabled = true;
        postUpdateUserPassword();
        setTimeout(() => {passwordUpdateButton.disabled = false;}, BUTTION_DISABLE_TIME);
    }
}