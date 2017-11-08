// this starts an autoscroll for when you are required
// to have safety text to begin scrolling automatically
// begin 'myScroll' function
var myScroll;
function loaded() {
	myScroll = new IScroll('#wrapper', { 
		scrollbars: 'custom',
		interactiveScrollbars: true,
		momentum: false
	});
}
	
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
// end 'myScroll' function

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
	
	// This initiates the auto scroll
	// see line 4-16 for scroll function
	setTimeout(function() {myScroll.scrollToElement('#bottom', 30000, 0, 100, IScroll.utils.ease.linear)}, 5000);
	setTimeout(function() {myScroll.scrollToElement('#top', 2000)}, 35000);
	
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