import * as utils from './rex.js';
import {WEBSITE_URL} from './consts.js';

window.onload = () => {
    setSigninButtonClickListener();
}

function setSigninButtonClickListener(){
	getLoginButton().onclick = buttonClick;

	getEmailInput().addEventListener("keyup", keypressEvent);
	getPasswordInput().addEventListener("keyup", keypressEvent);
}

function keypressEvent(event){
	event.preventDefault();
	if(event.keyCode === 13){
		buttonClick();
	}
}

function buttonClick(){
	let email = getEmailInput().value.toLowerCase().trim();
	let password = getPasswordInput().value;

	if(email){
		if(utils.isEmailValid(email)){
			if(password){
				if(password.length >= 6){
					signin(email, password);
				}else{
					showError("Password should be at least 6 characters");
				}
			}else{
				showError("Please enter your password");
			}
		}else{
			showError("Email is not correct");
		}
	}else{
		showError("Please enter your email address");
	}
}

function signin(email, password){
	
	getMainContainer().style.display = "none";
	getProgressContainer().style.display = "flex";

	let data = { email: email, password: password };

	utils.sendGetRequest(WEBSITE_URL, data)
	.then(json => {
		if(json.status == "success"){
			sessionStorage.setItem("userId", json.id);
			sessionStorage.setItem("isNewUser", 0);
			getProgressContainer().style.display = "none";
			window.open("dashboard.html", "_self");
		}else{
			getMainContainer().style.display = "block";
			getProgressContainer().style.display = "flex";
			showError(json.error, 5000);
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

function getEmailInput(){
	return document.getElementById("emailInput");
}

function getPasswordInput(){
	return document.getElementById("passwordInput");
}

function getLoginButton(){
	return document.getElementById("loginButton");
}

function getErrorMessage(){
	return document.getElementById("errorMessage");
}

function getMainContainer(){
	return document.getElementById("mainContainer");
}

function getProgressContainer(){
	return document.getElementById("progressContainer");
}