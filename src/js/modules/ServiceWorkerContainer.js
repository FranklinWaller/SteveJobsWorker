import ServiceWorkerRegistration from './ServiceWorkerRegistration';

export default class ServiceWorker {
    static register(src) {
        return new Promise((resolve) => {
            const worker = new Worker(src);

            resolve(new ServiceWorkerRegistration(worker));
        });
    }
}
