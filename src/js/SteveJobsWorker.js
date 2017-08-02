import ServiceWorkerContainer from './modules/ServiceWorkerContainer';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

const DATABASE_NAME = '__SteveJobsWorker__';

export default class SteveJobsWorker {
    static async init() {
        if (false && 'serviceWorker' in navigator) return;

        navigator.__defineGetter__('serviceWorker', () => ServiceWorkerContainer);

        // Since serviceworkers should always be spint up when starting
        // in order to intercept all requests.
        const database = new PouchDB(DATABASE_NAME);
        const serviceworkers = await database.find({
            selector: { type: 'serviceworker' },
        });

        const scriptTags = document.querySelectorAll('script');
        SteveJobsWorker.parseDomElements(scriptTags);
    }

    static parseDomElements(elements) {
        elements.forEach((element) => {
            if (!element.src) return;


            console.log(element.src);
        });
    }
}
