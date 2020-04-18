
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


function loginUser() {

    console.log("Login request sent")

	var xhr = new XMLHttpRequest();
	var url = "http://192.168.1.37:8000/auth/login_user/";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
					var json = JSON.parse(xhr.responseText);
					console.log(json);
					if (json["result"] == 0) {
						raiseAlert("loginalert", json["Error"]);
						return false;
					}

					else {
						return true;
					}
			}
	};
	useremail = document.getElementById('login_email')
	password = document.getElementById('login_password')
	var data = JSON.stringify({"user_email": useremail.value, "user_password": password.value});
	xhr.send(data);
	console.log("Request recieved")

	setcookie();

}

//sets session id as sessionid
function setcookie() {

	sessionid = json["sessionid"]

	document.cookie = sid + "=" + sessionid + "; path=/";
}

function getCookie(name) {
    var nameEQ = sid + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
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
