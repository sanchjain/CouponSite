
//disables login button by default
document.addEventListener("DOMContentLoaded", function(event) {
	var loginbutton = document.getElementById("loginbtn")
  	loginbutton.disabled = true;
  	loginbutton.style.background = "#696969"
});

//global check functions
var check_email = false;
var check_password = false;

//checks if field is empty or not
function checkEmail(emailfield) {

    if (emailfield.value == "") {
		raiseAlert("emailalert", "Please enter your email")
		check_email = false;
		loginbutton();
		return false;
	}

	dismissAlert("emailalert")
    check_email = true;
	loginbutton();
    return true;
}

//checks if field is empty or not
function checkPassword(passwordfield) {

    if (passwordfield.value == "") {
		raiseAlert("passwordalert", "Please enter your password")
		check_password = false;
		loginbutton();
		return false;
	}

	dismissAlert("passwordalert")
    check_password = true;
	loginbutton();
    return true;
}

//enables login button
function loginbutton() {

	var loginbutton = document.getElementById("loginbtn")
	console.log("function executed")
	if (check_email && check_password) {
		console.log("fields verified")
		loginbutton.style.background = "#76b852"
		loginbutton.disabled = false;
	}
	else {
		console.log("fields incorrect")
		loginbutton.style.background = "#696969"
		loginbutton.disabled = true;
		return true;
	}
}

//raises an alert
function raiseAlert(element, text) {
	var alertbox = document.getElementById(element)
	alertbox.innerHTML = text;
	alertbox.style.visibility = "visible";
}

//dismisses an alert
function dismissAlert(element) {
	var alertbox = document.getElementById(element)
	alertbox.style.visibility = "hidden";
}
