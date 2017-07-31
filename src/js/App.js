import ServiceWorkerHijacker from './features/ServiceWorkerHijacker';

export default class App {
    run() {
        console.log('Hello World');
    }
}

const PWA = {
    Features: {
        ServiceWorkerHijacker,
    }
};

window.PWA = PWA;
