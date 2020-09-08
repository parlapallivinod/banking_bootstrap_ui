const BANKING_API = "http://localhost:8080/banking/api/v1";
const REGISTRATION_API = BANKING_API + "/customers/registration"
const CUSTOMER_API = BANKING_API + "/customers/";
const BUTTION_DISABLE_TIME = 1000;

const BANKING_UI = "http://localhost:9090";
const BANKING_HOME_UI = BANKING_UI + "/home.html";
const BANKING_LOGIN_UI = BANKING_UI + "/login.html";
const CUSTOMER_HOME_UI = BANKING_UI + "/customer/home.html";

function BankingResponse(status, data) {
    this.status = status;
    this.data = data;
}


function showMessage(element, message, type) {
    let alertType = "alert-info";
    if (type == "SUCCESS") {
        alertType = "alert-success";
    } else if (type == "FAILURE") {
        alertType = "alert-danger";
    }

    //console.log("alertType");
    //console.log(alertType);

    let alertElement = 
    "<div class=\"alert " + alertType + " alert-dismissible fade show mb-0\" role=\"alert\">" + 
        message +  
        "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" + 
            "<span aria-hidden=\"true\">&times;</span>" + 
        "</button>" + 
    "</div>";
    element.innerHTML = alertElement;
}

async function home() {
    console.log("BANKING_API");
    console.log(BANKING_API)

    let status;
    let data;
    await fetch(BANKING_API)
        .then(response => {
            status = response.status;
            return response.text();
        })
        .then(text => {
            data = text;
        })
        .catch(e => {
            status = 500;
            data = e.message;
        });;
    console.log("status");
    console.log(status);
    console.log("data");
    console.log(data);
    return new BankingResponse(status, data);
}

async function registration(customer) {
    console.log("REGISTRATION_API");
    console.log(REGISTRATION_API)

    let status;
    let data;
    await fetch(
        REGISTRATION_API, 
        {
          method: "POST",
          body: JSON.stringify(customer),
          headers: {
            "Content-Type": "application/json;"
          }
        }
      ).then(response => {
            status = response.status;
            return response.json();
        })
        .then(json => {
            data = json;
        })
        .catch(e => {
            status = 500;
            data = e.message;
        });
    console.log("status");
    console.log(status);
    console.log("data");
    console.log(data);
    return new BankingResponse(status, data);
}

async function login(customer) {
    console.log("CUSTOMER_API");
    console.log(CUSTOMER_API);

    let status;
    let data;
    await fetch(
        CUSTOMER_API, 
        {
          method: "GET",
          headers: {
            "Authorization": "Basic " + btoa(customer.username + ":" + customer.password)
          }
        }
      ).then(response => {
            status = response.status;
            return response.json();
        })
        .then(json => {
            data = json;
        })
        .catch(e => {
            status = 500;
            data = e.message;
        });
    console.log("status");
    console.log(status);
    console.log("data");
    console.log(data);
    return new BankingResponse(status, data);
}

async function accountDetails() {
    console.log("CUSTOMER_API");
    console.log(CUSTOMER_API);

    let status;
    let data;
    await fetch(
        CUSTOMER_API, 
        {
          method: "GET",
          headers: {
            "Authorization": localStorage.getItem("Authorization")
          }
        }
      ).then(response => {
            status = response.status;
            return response.json();
        })
        .then(json => {
            data = json;
        })
        .catch(e => {
            status = 500;
            data = e.message;
        });
    console.log("status");
    console.log(status);
    console.log("data");
    console.log(data);
    return new BankingResponse(status, data);
}

function isUserLoggedIn() {
    if (localStorage.getItem("Authorization"))
        return true;
    else
        return false;
}

function logOutUser() {
    localStorage.removeItem("Authorization");
    
    showMessage(message, 
        "Logging Out ...", 
        "SUCCESS");
    setTimeout(() => {window.location.href = BANKING_LOGIN_UI;}, BUTTION_DISABLE_TIME);
}
