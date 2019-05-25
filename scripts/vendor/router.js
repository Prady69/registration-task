/*
Router methods to support routing of html views and corresponding JS file loads
Further modified to support calling of individual JS file instead of loading only HTML views
*/

'use strict';

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function (routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },
    init: function () {
        let r = this.routes;
        (function(scope, r) {
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function(scope, r){
        if (window.location.hash.length > 0) {
            for (let i = 0, length = r.length; i < length; i++) {
                let route = r[i];
                if(route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName, route.jsName);
                }
            }
        } else {
            for (let i = 0, length = r.length; i < length; i++) {
                let route = r[i];
                if(route.default) {
                    scope.goToRoute(route.htmlName, route.jsName);
                }
            }
        }
    },
    goToRoute: function (htmlName, jsName) {
        (function(scope) {
            let url = 'views/' + htmlName,
                urlJs = 'scripts/js/' + jsName,
                xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                }
            };
            let head= document.getElementsByTagName('head')[0];
            let script= document.createElement('script');
            script.type= 'text/javascript';
            script.src= urlJs;
            head.appendChild(script);
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    }
};

function Route(name, htmlName, jsName, defaultRoute) {
    try {
        if(!name || !htmlName) {
            throw 'error: name, htmlName and jsName params are mandatories';
        }
        this.constructor(name, htmlName, jsName, defaultRoute);
    } catch (e) {
        console.error(e);
    }
}

Route.prototype = {
    name: undefined,
    htmlName: undefined,
    jsName: undefined,
    default: undefined,
    constructor: function (name, htmlName, jsName, defaultRoute) {
        this.name = name;
        this.htmlName = htmlName;
        this.jsName = jsName;
        this.default = defaultRoute;
    },
    isActiveRoute: function (hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    }
};