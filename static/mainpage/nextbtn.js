
//disables next button by default
document.addEventListener("DOMContentLoaded", function(event) {
	var nextbutton = document.getElementById("nextbtn")
  	nextbutton.disabled = true;
  	nextbutton.style.background = "#696969"
});

//global check functions
var check_name = false;
var check_email = false;
var check_pass = false;
var check_confirm = false;


//checks if username is empty
function checkUsername(username) {

    if (username.value == "") {
		raiseAlert("namealert", "Please enter your name")
		check_name = false;
		nextbutton()
		return false;
	}

	dismissAlert("namealert")
    check_name = true;
	nextbutton()
    return true;
}

//Checks if email is valid
function checkEmailRegex(email) {

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(email.value) == false) {
    	raiseAlert("emailalert", "Enter a valid email address");
        check_email = false;
				nextbutton()
        return false;
    }

	dismissAlert("emailalert");
    return true;
}

//validates email by checking if it exists or not
function validateEmail(emailField) {
	// Check email regex
    if (checkEmailRegex(emailField)) {
    	console.log("Email format correct")
    	// Check email availabilty on server

    	var xhr = new XMLHttpRequest();
		var url = "http://192.168.1.37:8000/auth/check_email/";
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.onreadystatechange = function () {
		    if (xhr.readyState === 4 && xhr.status === 200) {
		        var json = JSON.parse(xhr.responseText);
		        console.log(json);
		        if (json["result"] == 0) {
		        	raiseAlert("emailalert", json["Error"]);
		        	check_email = false;
					nextbutton()
		        	return false;
		     	}
		        else {
		        	check_email = true;
					nextbutton()
		        	return true;
		        }
		    }
		};

		var data = JSON.stringify({"user_email": emailField.value});
		xhr.send(data);
		console.log("Sent Email for verifcation")
	}
}

//checks if password is valid
function checkPassword(passwordField) {
	var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

	if (reg.test(passwordField.value) == false) {
		raiseAlert("passwordalert", "Password must contain a capital letter and number!")
     	check_pass = false;
		nextbutton()
     	return false;
	}

	dismissAlert("passwordalert")
	check_pass = true;
	nextbutton()
	return true;
}

//checks if passwords match
function confirmPassword(passwordField) {
	var ogpassword = document.getElementById("pwd1").value;

	if (passwordField.value != ogpassword) {
		raiseAlert("confirmalert", "Password does not match")
		check_confirm = false;
		nextbutton()
		return false;
	}

	dismissAlert("confirmalert")
	check_confirm = true;
	nextbutton()
	return true;
}

//checks when to enable the next button
function nextbutton() {

	var nextbutton = document.getElementById("nextbtn")
	console.log("function executed")
	if (check_name && check_email && check_pass && check_confirm) {
		console.log("fields verified")
		nextbutton.style.background = "#76b852"
		nextbutton.disabled = false;
	}
	else {
		console.log("fields incorrect")
		nextbutton.style.background = "#696969"
		nextbutton.disabled = true;
		return true;
	}
}

//Removes next button and adds submit, otp and checkbox
function onNextButtonClick() {
	document.getElementById("name").disabled = true;
	document.getElementById("email").disabled = true;
	document.getElementById("pwd1").disabled = true;
	document.getElementById("pwd2").disabled = true;
	document.getElementById("nextbtn").style.display = "none"

	document.getElementById("otp").style.display = "block"
	document.getElementById("registerbtn").style.display = "block"
	document.getElementById("checkbox").style.display = "block"

    requestOTP();
}

//requests an OTP
function requestOTP() {

	console.log("OTP request sent")

	var xhr = new XMLHttpRequest();
	var url = "http://192.168.1.37:8000/auth/request_otp/";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
					var json = JSON.parse(xhr.responseText);
					console.log(json);
					if (json["result"] == 0) {
						raiseAlert("otpalert", json["Error"]);
						check_otp = false;
						return false;
			        }
			        else {
					check_otp = true;
					return true;
			        }
			}
	};

    var emailvalue = document.getElementById("email").value
	var data = JSON.stringify({"user_email": emailvalue});
	xhr.send(data);
	console.log("Sent Email for OTP")
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
