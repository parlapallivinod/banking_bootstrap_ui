

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

window.onload = (() => {
    getHome();    
});