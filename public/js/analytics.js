
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    // your code here
    console.log("Analytics loaded");
    $(".container").click(function(e) {
        console.log("Sending data to Google");
        gtag('event', 'click', {'event_category': 'exit'});
    });
}
