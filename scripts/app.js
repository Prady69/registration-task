'use strict';
(function () {
    function init() {
        var router = new Router([
            new Route('login', 'login.html', 'login.js', true),
            new Route('registration', 'registration.html', 'registration.js')
        ]);
    }
    init();
}());