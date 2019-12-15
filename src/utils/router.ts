import bus from './bus';

/** Router class to redirect to view via path */
export default class Router {
    routes: object;
    root: HTMLElement;
    /**
     * Router constructor.
     * @constructor
     * @param {object} root
     */
    constructor(root) {
        this.routes = {};

        this.root = root;
    }

    /**
     * Register a new path to a View.
     * @param {string} path
     * @param {BaseView} View
     * @return {object} - Modified router
     */
    register(path, View) {
        this.routes[path] = {
            View: View,
            view: null,
            el: null,
        };
        bus.on(path, () => {
            this.open(path);
        });

        return this;
    }

    /**
     * Open View linked to the given path.
     * @param {string} path
     */
    open(path) {
        // const route = this.routes[path];

        if (path == undefined) {
            return;
        }

        let route;
        let argname;
        let argvalue;

        for (let key in this.routes) {
            if (this.routes[key]) {
                const view = this.routes[key];

                const match = key.match(/([^:]+):?(.+)?/);

                argname = match[2];

                if (argname) {
                    key = key.replace(':' + argname, '(.+)');
                }

                if (!path.match(key)) {
                    continue;
                }

                route = view;
                argvalue = path.match(key)[1];
            }
        }

        // console.log(route, argname, argvalue);

        if (!route) {
            this.open('/');
            return;
        }

        if (window.location.pathname !== path) {
            window.history.pushState(
                null,
                '',
                path
            );
        }

        let {View, view, el} = route;

        if (!el) {
            el = document.createElement('section');
            el.dataset.page = path;
            this.root.appendChild(el);
        }

        if (!view) {
            view = new View(el, argvalue);
        }

        if (!view.active) {
            Object.values(this.routes).forEach(function({view}) {
                if (view && view.active) {
                    view.hide();
                }
            });
        }
        view.show();

        this.routes[path] = {View, view, el};
    }

    /**
     * Start a Router.
     */
    start() {
        this.root.addEventListener('click', function(event) {
            if (!(event.target instanceof HTMLAnchorElement || event.target instanceof HTMLImageElement)) {
                return;
            } else if (event.target instanceof HTMLAnchorElement) {
                event.preventDefault();
                const link = event.target;
    
                this.open(link.pathname);
            } else if (event.target instanceof HTMLImageElement) {
                event.preventDefault();
                this.open(event.target.dataset.section);
            }
        }.bind(this));

        window.addEventListener('popstate', function() {
            const currentPath = window.location.pathname;

            this.open(currentPath);
        }.bind(this));

        const currentPath = window.location.pathname;

        this.open(currentPath);
    }
}
