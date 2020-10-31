let registrationForm;
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
      "Registration completed successfully. Please login into you account to perform transactions.", 
      "SUCCESS");
      clearRegistrationForm();
  } else if (response.status == 600) {
    showMessage(message, response.data, "FAILURE");
  } else {
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

  registrationForm.onsubmit = async function(event) {
    event.preventDefault();
    showLoadingSpinner();
    await postRegistration();
    hideLoadingSpinner();
  }
}