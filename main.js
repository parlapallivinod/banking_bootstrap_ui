const BANKING_API = "http://localhost:8080/banking/api/v1";
const REGISTRATION_API = BANKING_API + "/customers/registration"
const BUTTION_DISABLE_TIME = 1000;

function BankingResponse(status, data) {
    this.status = status;
    this.data = data;
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
            status = 404;
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
            status = 404;
            data = e.message;
        });
    console.log("status");
    console.log(status);
    console.log("data");
    console.log(data);
    return new BankingResponse(status, data);
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