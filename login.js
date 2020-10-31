let loginForm;
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
      localStorage.setItem("Authorization", "Basic " + btoa(response.data.username + ":" + response.data.password));
      window.location.href = CUSTOMER_HOME_UI;
  } else {
    showMessage(message, "Invalid credentials", "FAILURE");
  } 
  
}

window.onload = function() { 
  message = document.querySelector("#message");
  console.log("message");
  console.log(message);

  loginForm = document.querySelector("#loginForm");
  console.log("loginForm");
  console.log(loginForm);

  loginForm.onsubmit = async function(event) {
    event.preventDefault();
    showLoadingSpinner();
    await postLogin();
    hideLoadingSpinner();
  }
}