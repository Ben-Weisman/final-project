console.log("Add this recipe");

chrome.browserAction.onClicked.addListner(buttonClicked);

function buttonClicked() {
	console.log("recipe added");
}