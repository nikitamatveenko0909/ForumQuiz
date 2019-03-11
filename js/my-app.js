// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):


// Option 2. Using one 'pageInit' event handler for all pages:

//Form
var app = new Framework7();

var $$ = Dom7;

$$('.convert-form-to-data').on('click', function () {
    var formData = app.form.convertToData('#my-form');
    alert(JSON.stringify(formData));
});

$$('.fill-form-from-data').on('click', function () {
    var formData = {
        'name': 'John',
        'email': 'john@doe.com',
        'gender': 'female',
        'toggle': ['yes'],
    }
    app.form.fillFromData('#my-form', formData);
});