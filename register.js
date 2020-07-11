let registrationForm;
let registerButton;
let message;


function clearRegistrationForm() {
  document.querySelector("#username").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#verifyPassword").value = "";
}

async function postRegistration() {
  let username = document.querySelector("#username").value;
  console.log("username: " + username);
  let password = document.querySelector("#password").value
  console.log("password: " + password);
  let verifyPassword = document.querySelector("#verifyPassword").value
  console.log("verifyPassword: " + verifyPassword);

  if (password != verifyPassword) {
    console.log("Passwords don't match");
    showMessage(message, "Passwords don't match", "FAILURE");
    return;
  }

  response = await registration({"username": username, "password": password});
  console.log("response");
  console.log(response);

  if (response.status == 201) {
    console.log("success");
    showMessage(message, 
      "Registration completed successfully. Pleae login into you account to peform transactions.", 
      "SUCCESS");
      clearRegistrationForm();
  } else {
    console.log("failure");
    showMessage(message, response.data.message + "<br/>" + response.data.details, "FAILURE");
  }
}

window.onload = function() {
  message = document.querySelector("#message");
  console.log("message");
  console.log(message);

  registrationForm = document.querySelector("#registrationForm");
  console.log("registrationForm");
  console.log(registrationForm);

  registerButton = document.querySelector("#registerButton");
  console.log("registerButton");
  console.log(registerButton);

  registrationForm.onsubmit = function(event) {
    event.preventDefault();
    registerButton.disabled = true;
    postRegistration();
    setTimeout(() => {registerButton.disabled = false;}, BUTTION_DISABLE_TIME)
  }
}