import ServiceWorker from './ServiceWorkerHijacker/ServiceWorker';

let hasServiceWorker = false;

// Remember old methods
let originalServiceWorkerRegister = null;

export default class ServiceWorkerHijacker {
    static init() {
        if ('serviceWorker' in navigator) hasServiceWorker = true;

        ServiceWorkerHijacker.hijack();
    }

    static hijack() {
        // When we have an service worker already we must remember the old one.
        if (hasServiceWorker) {
            originalServiceWorkerRegister = navigator.serviceWorker.register;
        }

        ServiceWorker.init({
            register: originalServiceWorkerRegister,
        });

        navigator.serviceWorker.register = ServiceWorker.register.bind(navigator.serviceWorker);
    }
}
