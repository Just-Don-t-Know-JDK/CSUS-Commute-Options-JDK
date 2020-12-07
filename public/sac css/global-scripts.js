// Sac State Global JS

//**************Main Menu: Modal Autofocus For Search Input***************/
$('.modal').on('shown.bs.modal', function() {
  $(this).find('[autofocus]').focus();
});

//Check if ClipboardJS is loaded https://clipboardjs.com/
/*if (typeof ClipboardJS == 'function') { 
  new ClipboardJS('.button-copy-anchor');
  console.log(window.location.hostname);
  if(window.location.hostname != "cascadetest.csus.edu" && window.location.hostname != "cascade.csus.edu")
  {
      $(".button-copy-anchor").hide();
  }
}
*/

        
//***** Start: Functions for Back to Top button *****/
// When the user scrolls down 2000px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    var pixelValue = 2000;
  if (document.body.scrollTop > pixelValue || document.documentElement.scrollTop > pixelValue) {
    //document.getElementById("button-top").style.display = "block";
    $('#button-top').fadeIn("slow");
  } else {
    //document.getElementById("button-top").style.display = "none";
    $('#button-top').fadeOut("slow");
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
//***** End: Fucntions for Back to Top button *****/

$(document).ready(function(){
    //Create Back to Top Button and append to breadcrumb side bar
    $('<button/>',{
        text: 'Back to Top',
        id: 'button-top',
        on: {
            click: function(){
                topFunction();
            }
        }
    }).appendTo('main');

});

//Site Improve Analytics
(function() {
var sz = document.createElement('script'); sz.type = 'text/javascript'; sz.async = true;
sz.src = '//siteimproveanalytics.com/js/siteanalyze_14108.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sz, s);
})();

//***** START: Google Analytics Event Tracking *****
//https://www.chrisains.com/seo/code-mark-up/gtag-js-event-tracking-in-google-analytics/
// pdf function
$('a[href$=".pdf"]').click(function(){
	if(location.hostname != 'cascade.csus.edu' && location.hostname != 'cascadetest.csus.edu'){
		var pdfurl=jQuery(this).attr('href');
		gtag('event', 'contact', { 'event_category' : 'PDF Download' , 'event_action' : 'Download', 'event_label' : pdfurl});
		return true;
	}
});

//GA Event Tracking For Global Menu on only pages on www.csus.edu
$('#csus-global-navbar .nav.justify-content-end a').on('click', function() {
    gtagSendFnGlobalMenu('Click-Primary',this.text);
});

$('#csus-global-navbar #quicklinks-modal a').on('click', function() {
    gtagSendFnGlobalMenu('Click-Secondary',this.text);
});

//linkSection: Section name of the page
//linkLabel: Link label name
function gtagSendFnGlobalMenu(linkSection, linkLabel) {
    if((location.hostname != 'cascade.csus.edu' && location.hostname != 'cascadetest.csus.edu') && location.hostname == 'www.csus.edu'){
    	gtag('event', linkSection, {
    	'event_category': 'Global Menu - Template2019',
    	'event_label': linkLabel
    	});
    	 return true;
    }
}
//***** END: Google Analytics Event Tracking *****

//****** WCM Edit Button *******
(function() {
    var pageID = document.querySelector("meta[name='page-id']").content;
    var pageURL = "https://csus.cascadecms.com/entity/open.act?id=" + pageID + "&type=page";

    var footerLinks = document.querySelector("footer#csus-global-footer>div.container-fluid.bottombar>ul");

    var link = document.createElement("a");
    var linkMsg = "Edit page in Cascade WCM";
    link.setAttribute("href", pageURL);
    link.setAttribute("class", "dot");

    var linkText = document.createTextNode(linkMsg);

    link.appendChild(linkText);
    footerLinks.parentNode.insertBefore(link, footerLinks);
})();