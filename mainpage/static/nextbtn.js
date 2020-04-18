
//disables register button by default
document.addEventListener("DOMContentLoaded", function(event) {
	var registerbutton = document.getElementById("registerbtn")
  	registerbutton.disabled = true;
  	registerbutton.style.background = "#696969"
});

//global check functions
var check_name = false;
var check_email = false;
var check_pass = false;
var check_confirm = false;
var check_checkbox = false;


//checks if username is empty
function checkUsername(username) {

    if (username.value == "") {
		raiseAlert("namealert", "Please enter your name")
		check_name = false;
		registerbutton()
		return false;
	}

	dismissAlert("namealert")
    check_name = true;
	registerbutton()
    return true;
}

//Checks if email is valid
function validateEmail(email) {

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(email.value) == false) {
    	raiseAlert("emailalert", "Enter a valid email address");
        check_email = false;
		registerbutton()
        return false;
    }

    check_email = true;
	dismissAlert("emailalert");
    return true;
}

//checks if password is valid
function checkPassword(passwordField) {
	var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

	if (reg.test(passwordField.value) == false) {
		raiseAlert("passwordalert", "Password must contain a capital letter and number!")
     	check_pass = false;
		registerbutton()
     	return false;
	}

	dismissAlert("passwordalert")
	check_pass = true;
	registerbutton()
	return true;
}

//checks if passwords match
function confirmPassword(passwordField) {
	var ogpassword = document.getElementById("pwd1").value;

	if (passwordField.value != ogpassword) {
		raiseAlert("confirmalert", "Password does not match")
		check_confirm = false;
		registerbutton()
		return false;
	}

	dismissAlert("confirmalert")
	check_confirm = true;
	registerbutton()
	return true;
}

//checks when to enable the register button
function registerbutton() {

	var registerbutton = document.getElementById("registerbtn")
	console.log("function executed")
	if (check_name && check_email && check_pass && check_confirm && check_checkbox) {
		console.log("fields verified")
		registerbutton.style.background = "#76b852"
		registerbutton.disabled = false;
	}
	else {
		console.log("fields incorrect")
		registerbutton.style.background = "#696969"
		registerbutton.disabled = true;
		return true;
	}
}

function validateCheckBox() {
	if (document.getElementById("terms").checked) {
		check_checkbox = true;
		registerbutton();
		return true;
	}
	else {
		check_checkbox = false;
		registerbutton();
		return false;
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
