import ServiceWorkerContainer from './modules/ServiceWorkerContainer';

export default class SteveJobsWorker {
    static init() {
        if (false && 'serviceWorker' in navigator) return;

        navigator.__defineGetter__('serviceWorker', () => ServiceWorkerContainer);
    }
}
