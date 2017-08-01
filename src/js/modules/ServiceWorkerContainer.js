import PouchDB from 'pouchdb';
import ServiceWorkerRegistration from './ServiceWorkerRegistration';

const DATABASE_NAME = '__SteveJobsWorker__';

export default class ServiceWorker {
    static register(src) {
        return new Promise(async (resolve) => {
            const database = new PouchDB(DATABASE_NAME);
            let serviceWorkerUrl = src;

            if (false && navigator.onLine) {
                const response = await fetch(src);

                database.put({
                    _id: src,
                    url: src,
                    blob: await response.blob(),
                });
            } else {
                // Since we are offline we have to check our database for our blob.
                const offlineServiceWorker = await database.get(src);
                serviceWorkerUrl = URL.createObjectURL(offlineServiceWorker.blob);
            }

            const worker = new Worker(serviceWorkerUrl);
            resolve(new ServiceWorkerRegistration(worker));
        });
    }
}
