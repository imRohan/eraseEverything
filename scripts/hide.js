var _body = document.body;
var _activeState = true;
// Where the gruntwork happens
chrome.runtime.onMessage.addListener(
	// Did we just get a request? Yussss.
	function(request, sender, sendResponse) {
		// Check if widget should be active or not
		if( request.message === "true" ) {
			// Add eventListener
			addEventListeners();
			console.log('HideEverything is now active. Start clicking!!');
			_activeState = true;
		}
		else {
			// Remove eventListener
			removeEventListeners();
			console.log('HideEverything is now disabled. Enjoy your content!');
			_activeState = false;
		}

		function addEventListeners() {
			_body.addEventListener("click", eraseEverything, false);
			_body.addEventListener("mouseover", addBorder, false);
			_body.addEventListener("mouseout", removeBorder, false);
			_activeState = false;
		}

		function removeEventListeners(){
			//(THIS SHIT DOESN'T WORK. GOTTA FIX. HENCE THE SHIT ACTIVESTATE WORKAROUND)
			_body.removeEventListener("click", eraseEverything);
		}

		function eraseEverything(event) {
			if (_activeState){
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

		function addBorder(event){
			if (_activeState){
				var _target = event.target;
				var _targetParent = _target.parentElement;
				var _targetParentStyle = _target.parentElement.style;
				_targetParentStyle.border ="3px solid #E47373";
				_targetParentStyle.borderRadius = "5px";
				_originalBackground = _targetParentStyle.background;
				_targetParentStyle.background="#F3C7C7";
			}
		}

		function removeBorder(event){
			if (_activeState){
				var _target = event.target;
				var _targetParentStyle = _target.parentElement.style;
				_targetParentStyle.border = "none";
				_targetParentStyle.background = _originalBackground;
			}
		}
	}
);
