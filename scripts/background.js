//Runs in the background, forever!
var _active = true;
// Called when the user clicks on the extensions logo
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the current active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    // Send a simple JSON message with true as param
    chrome.tabs.sendMessage(activeTab.id, {"message": String(_active)});
    _active = !_active;
  });
});