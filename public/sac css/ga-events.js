//JS
$(document).ready(function(){
	//Start---GA Event/Link Tracking: MH----
	//Add link click event tracking to a specific section of page below
	$('#csus-global-navbar a').on('click', function() {
		gtagSendFn('Header NavMenu', this.text);
	});
	
	$('.sac-state-news-section a').on('click', function() {
		gtagSendFn('Sac State News', this.text);
	});
	
	$('.sac-state-events-section a').on('click', function() {
		gtagSendFn('Sac State Events', this.text);
	});
	
	$('.quicklinks-section a').on('click', function() {
		gtagSendFn('Degrees and Majors', this.text);
	});
	
	$('#csus-global-footer a').on('click', function() {
		gtagSendFn('Footer', this.text);
	});
	
	//END---GA Event/Link Tracking: MH----
});


//The above GTag Event/Link Trackings are dependant on this function gtagSendFn: MH
//linkSection: Section name of the page
//linkLabel: Link label name
function gtagSendFn(linkSection, linkLabel) {
    if((location.hostname != 'cascade.csus.edu' && location.hostname != 'cascadetest.csus.edu')){
    	gtag('event', linkSection, {
    	'event_category': 'Homepage - Template2019',
    	'event_label': linkLabel
    	});
    	//console.log('GA Sent!');
    	return true;
    }
}