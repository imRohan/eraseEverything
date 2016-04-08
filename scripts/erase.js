var _body = document.body;
var _activeState = true;
var _defaultAttributes = {};
// Where the gruntwork happens
chrome.runtime.onMessage.addListener(
	// Did we just get a request? Yussss.
	function(request, sender, sendResponse) {
		// Check if widget should be active or not
		if (request.message === "true") {
			// Add eventListener
			addEventListeners();
			console.log('HideEverything is now active. Start clicking!!');
			_activeState = true;
		} else {
			console.log('HideEverything is now disabled. Enjoy your content!');
			_activeState = false;
		}

		function addEventListeners() {
			_body.addEventListener("click", eraseEverything, false);
			_body.addEventListener("mouseover", checkElement, false);
			_body.addEventListener("mouseout", removeBorder, false);
			_activeState = false;
		}

		function eraseEverything(event) {
			if (_activeState) {
				// The element the user clicked
				var _target = event.target;
				var _targetParent = _target.parentElement;
				// Prevent default action on the click event, for when clicking on links/buttons
				event.preventDefault();
				console.log("You clicked: ");
				console.log(_target);
				// The element's parent
				var _targetParentStyle = _targetParent.style;
				// Set parent's opacity to 1 since, by default it may not be set
				_targetParentStyle.opacity = 1;
				// Fade out, and hide
				(function fade() {
					(_targetParentStyle.opacity -= .1) < 0 ? _targetParentStyle.display = "none" : setTimeout(fade, 40)
				})();
			}
		}

		function getParents(element){
			var parents = [];
    	var p = element.parentNode;

    	while (p !== null) {
        var o = p;
        parents.push(o);
        p = o.parentNode;
    	}

    	return parents; // returns an Array []
		}


		function checkElement(event) {
			if (_activeState && event.target != _body) {
				var _target = event.target;
				// Check to see if element has a link, if so remove it so user doesn't get sent to other page
				if (_target.hasAttribute('href')) {
					_defaultAttributes["href"] = _target.getAttribute('href');
					_target.setAttribute('href', "#");
				}
				if (_target.parentElement.hasAttribute('href')) {
					_defaultAttributes["href"] = _target.parentElement.getAttribute('href');
					_target.parentElement.setAttribute('href', "#");
				}
				// var _parents = getParents(event.target);

				// console.log(_parents);
				
				addBorder(event);
			}
		}

		function addBorder(event) {
			var _target = event.target;
			var _targetParentStyle = _target.parentElement.style;
			_targetParentStyle.border = "3px solid #E47373";
			_targetParentStyle.borderRadius = "5px";
			_defaultAttributes["background"] = _targetParentStyle.background;
			_targetParentStyle.background = "#F3C7C7";
		}

		function removeBorder(event) {
			if (_activeState) {
				var _target = event.target;
				var _targetParentStyle = _target.parentElement.style;
				_targetParentStyle.border = "none";
				_targetParentStyle.background = _defaultAttributes["background"];
				_target.setAttribute('href', _defaultAttributes["href"]);
			}
		}
	}
);