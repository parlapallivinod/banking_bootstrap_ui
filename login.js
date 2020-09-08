let loginForm;
let loginButton;
let message;

async function postLogin() {

  let username = document.querySelector("#username").value;
  console.log("username: " + username);
  let password = document.querySelector("#password").value
  console.log("password: " + password);

  
  response = await login({"username": username, "password": password});
  console.log("response");
  console.log(response);

  if (response.status == 200) {
    console.log("success");
    showMessage(message, 
      "Logging In as '" + response.data.username + "'", 
      "SUCCESS");
      localStorage.setItem("Authorization", "Basic " + btoa(response.data.username + ":" + response.data.password));
      setTimeout(() => {window.location.href = CUSTOMER_HOME_UI;}, BUTTION_DISABLE_TIME);
    } else {
    console.log("failure");
    showMessage(message, "Invalid credentials.", "FAILURE");
  }
  
}

window.onload = function() {
  message = document.querySelector("#message");
  console.log("message");
  console.log(message);

  loginForm = document.querySelector("#loginForm");
  console.log("loginForm");
  console.log(loginForm);

  loginButton = document.querySelector("#loginButton");
  console.log("loginButton");
  console.log(loginButton);

  loginForm.onsubmit = function(event) {
    event.preventDefault();
    loginButton.disabled = true;
    postLogin();
    setTimeout(() => {loginButton.disabled = false;}, BUTTION_DISABLE_TIME);
  }
}