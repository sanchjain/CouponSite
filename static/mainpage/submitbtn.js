

//global check functions
var check_otp = false;
var check_checkbox = false;

//enables submit button
function submitbutton() {

	var submitbutton = document.getElementById("registerbtn")
	console.log("function executed")
	if (check_otp && check_checkbox) {
		console.log("fields verified")
		submitbutton.style.background = "#76b852"
		submitbutton.disabled = false;
	}
	else {
		console.log("fields incorrect")
		submitbutton.style.background = "#696969"
		submitbutton.disabled = true;
		return true;
	}
}

//checks if otp matches with mail
function submitUserData() {

	console.log("Data and OTP sent")

	var xhr = new XMLHttpRequest();
	var url = "http://192.168.1.37:8000/auth/register_user/";
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

	email = document.getElementById('email')
	name = document.getElementById('name')
	pwd1 = document.getElementById('pwd1')
	otp = document.getElementById('otp')

	var data = JSON.stringify({"user_email": email.value, "user_name": name.value, user_password: pwd1.value, "otp": otp.value});
	xhr.send(data);
	console.log("Data recieved")


}

//checks if field is empty or not
function checkOTP(otpfield) {

    if (otpfield.value == "") {
		raiseAlert("otpalert", "Please enter mailed OTP")
		check_otp = false;
		submitbutton();
		return false;
	}

	dismissAlert("otpalert")
    check_otp = true;
	submitbutton();
    return true;
}


function validateCheckBox() {
	if (document.getElementById("terms").checked) {
		check_checkbox = true;
		submitbutton();
		return true;
	}
	else {
		check_checkbox = false;
		submitbutton();
		return false;
	}
}


function raiseAlert(element, text)
{
	var alertbox = document.getElementById(element)
	alertbox.innerHTML = text;
	alertbox.style.visibility = "visible";
}


function dismissAlert(element)
{
	var alertbox = document.getElementById(element)
	alertbox.style.visibility = "hidden";
}
