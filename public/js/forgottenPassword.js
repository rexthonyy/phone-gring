import * as utils from './rex.js';
import {WEBSITE_URL} from './consts.js';

window.onload = () => {
    setPrimaryButtonClickListener();
}

function setPrimaryButtonClickListener(){
    getPrimaryButton().onclick = buttonClick;

	getInput().addEventListener("keyup", (event) => {
		event.preventDefault();
		if(event.keyCode === 13){
			buttonClick();
		}
	});
}

function buttonClick(){
	let email = getInput().value.toLowerCase().trim();

	if(email){
		if(utils.isEmailValid(email)){
			sendCode(email);
		}else{
			showError("Email is not correct");
		}
	}else{
		showError("Please enter your email address");
	}
}

function sendCode(email){
	
	getMainContainer().style.display = "none";
	getProgressContainer().style.display = "flex";
    
    let url = `${WEBSITE_URL}/forgottenPassword?email=${email}`;

	utils.sendGetRequest(url)
	.then(json => {
		if(json.status == "success"){
			sessionStorage.setItem("email", email);
			getProgressContainer().style.display = "none";
			window.open("forgottenPasswordVerification.html", "_self");
		}else{
			getMainContainer().style.display = "flex";
			getProgressContainer().style.display = "none";
            showError(json.error, 5000);
            getInput().focus();
		}
	}).catch(err => {
		console.error(err);
	});
}

function showError(error, duration = 3000){
	let errorMessage = getErrorMessage();
	errorMessage.textContent = error;
    errorMessage.style.display = "block";
    utils.wait(duration, () => {
        errorMessage.style.display = "none";
    });
}

function getInput(){
	return document.getElementById("emailInput");
}

function getPrimaryButton(){
	return document.getElementById("primaryButton");
}

function getErrorMessage(){
	return document.getElementById("errorMessage");
}

function getResendLink(){
	return document.getElementById("resend");
}

function getMainContainer(){
	return document.getElementById("mainContainer");
}


function getProgressContainer(){
	return document.getElementById("progressContainer");
}