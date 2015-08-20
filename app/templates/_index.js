require([
    'app/App',
    'dojo/domReady!'
], function(MyDojo, App) {
    var app = new App({});
    document.body.appendChild(app.content);
    app.content.startup();
});
