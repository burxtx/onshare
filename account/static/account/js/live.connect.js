function signInUser() {
    WL.login({
        scope: ["wl.signin", "wl.skydrive"]
    }, onLoginComplete);
}

document.write("<button onclick='signInUser()'>" + "Sign In</button>");
WL.ui({
  name: "signin",
  element: "signin",
  scope: scopes
});
$(document).ready(function (){
// var scopes = ["wl.signin", "wl.basic"];
// WL.init({
//   client_id: "0000000040125771",
//   redirect_uri: "www.baidu.com",
//   scope: "wl.signin", 
//   response_type: "token"
// });
WL.init({ 
  client_id: "0000000040125771",
  scope: "wl.signin" }).then(
function (result) {
    if (result.status == "connected") {
        liveSdkSample.displayMe();
        }
    else {
        // Display the sign-in button.
        connectButton.style.display = "block";
        connectButton.onclick = function () {
            WL.login({
                scope: ["wl.signin", "wl.basic"]
                    }).then(
                        function (result) {
                            if (result.status == "connected") {
                                // Don't display the sign-in button.
                                connectButton.style.display = "none";
                                liveSdkSample.displayMe();
                            }
                        }
                    );
                };
            }
        });

function id(domId) {
return document.getElementById(domId);
}

function displayMe() {
var imgHolder = id("meImg"),
nameHolder = id("meName");

if (imgHolder.innerHTML != "") return;

if (WL.getSession() != null) {
WL.api({ path: "me/picture", method: "get" }).then(
function (response) {
if (response.location) {
imgHolder.innerHTML = "<img src='" + response.location + "' />";
}
}
);

WL.api({ path: "me", method: "get" }).then(
function (response) {
nameHolder.innerHTML = response.name;
}
);
}
}

function clearMe() {
id("meImg").innerHTML = "";
id("meName").innerHTML = "";
}

WL.Event.subscribe("auth.sessionChange",
function (e) {
if (e.session) {
displayMe();
}
else {
clearMe();
}
}
);

WL.init({ client_id: client_id, redirect_uri: redirect_uri, response_type: "code", scope: scope });

WL.ui({ name: "signin", element: "signin" });
