// Where the gruntwork happens
chrome.runtime.onMessage.addListener(
	// Recieve request
	function(request, sender, sendResponse) {
		// Check if widget should be active or not
		if( request.message === "true" ) {
			console.log('HideEverything is now active. Start clicking!!');
			// Apply eventlistener to the body of the current tab
			$('body').click(function(event){
				// Prevent default action on the click event, for when clicking on links/buttons
				event.preventDefault();
				var _target = event.target;
				// Hide it!
				$(_target).closest("div").fadeOut();    
			});
		}
		else {
			console.log('HideEverything is now disabled. Enjoy your content!');
			// Remove eventListener
			$('body').off('click');
		}
	}
);
