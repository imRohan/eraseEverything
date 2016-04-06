// Where the gruntwork happens
chrome.runtime.onMessage.addListener(
	// Did we just get a request? Yussss.
	function(request, sender, sendResponse) {
		var _body = document.body;
		// Check if widget should be active or not
		if( request.message === "true" ) {
			// Add eventListener
			_body.addEventListener("click",eraseEverything, false);
			console.log('HideEverything is now active. Start clicking!!');
		}
		else {
			// Remove eventListener
			_body.removeEventListener("click", eraseEverything);
			console.log('HideEverything is now disabled. Enjoy your content!');
		}

		function eraseEverything(event) {
			// The element the user clicked
			var _target = event.target;
			// Prevent default action on the click event, for when clicking on links/buttons
			event.preventDefault();
			console.log("You clicked: ");
			console.log(_target);
			// The element's parent
			var _targetParentStyle = _target.parentElement.style;
			// Set parent's opacity to 1 since, by default it may not be set
			_targetParentStyle.opacity = 1;
			// Fade out, and hide
			(function fade(){(_targetParentStyle.opacity-=.1)<0?_targetParentStyle.display="none":setTimeout(fade,40)})();
		}
	}
);
