let message;

async function getHome() {
    let response = await home();
    console.log("response");
    console.log(response)
   
    if (response.status == 200) {
    } else if (response.status == 600) {
        showMessage(message, response.data, "FAILURE");
    } else {
        showMessage(message, response.data.message + "<br/>" + response.data.details, "FAILURE");
    }
}

window.onload = async function(){
    message = document.querySelector("#message");
    console.log("message");
    console.log(message);

    showLoadingSpinner();
    await getHome();
    hideLoadingSpinner(); 
}