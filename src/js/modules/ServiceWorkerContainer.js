import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import ServiceWorkerRegistration from './ServiceWorkerRegistration';
import upsert from '../utils/upsert';

PouchDB.plugin(PouchDBFind);
const DATABASE_NAME = '__SteveJobsWorker__';

export default class ServiceWorker {
    static register(src) {
        return new Promise(async (resolve) => {
            const database = new PouchDB(DATABASE_NAME);
            let serviceWorkerUrl = src;

            try {
                if (navigator.onLine) {
                    const response = await fetch(src);

                    // We also have to reload our appcache in order to stay up to date.
                    // We can always do this when we are online since we can already get it.
                    const webappCache = window.applicationCache;
                    webappCache.addEventListener('updateready', webappCache.swapCache, false);

                    // Store the contents of the service worker in the db.
                    // Either by updating the existing one, or creating a new entry.
                    const blob = await response.blob();

                    const data = {
                        _id: src,
                        type: 'serviceworker',
                        url: src,
                        blob,
                    };

                    upsert(database, data);
                } else {
                    // Since we are offline we have to check our database for our blob.
                    const offlineServiceWorker = await database.get(src);
                    serviceWorkerUrl = URL.createObjectURL(offlineServiceWorker.blob);
                }
            } catch (ex) {
                console.error(ex);
            }

            const worker = new Worker(serviceWorkerUrl);
            resolve(new ServiceWorkerRegistration(worker));
        });
    }
}
