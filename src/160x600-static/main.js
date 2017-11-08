// begin Enabler INIT listener
// If true, start function. If false, listen for INIT.
window.onload = function() {
	if (Enabler.isInitialized()) {
		enablerInitHandler();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
	}
}
// end Enabler INIT listener

function enablerInitHandler() {
	
	// This starts timing how long the ad is shown
	Enabler.startTimer("Time user is on Ad");
	
	// exit click on button element
	function bgExitHandler(e) {
		Enabler.exitOverride('Background Exit', 'http://www.google.com');
		Enabler.counter('Click on Background Exit');
		Enabler.stopTimer("Time user is on Ad");
	}
	document.getElementById('exit').addEventListener('click', bgExitHandler, false);
		
}