'use strict';
(function () {
    function init() {
        var router = new Router([
            new Route('login', 'login.html', 'login.js'),
            new Route('registration', 'registration.html', 'registration.js', true)
        ]);
    }
    init();
}());