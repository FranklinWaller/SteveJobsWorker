import PouchDB from 'pouchdb';
import CacheStorage from './modules/CacheStorage';
import InstallEvent from './modules/events/InstallEvent';
import sleep from './utils/sleep';

export default class WebWorkerController {
    static async run() {
        if (false && typeof caches !== 'undefined') return;

        self.__defineGetter__('caches', () => new CacheStorage());

        WebWorkerController.initEvents();
    }

    static async initEvents() {
        // Sleep so we make sure all events are attached
        await sleep(100);

        // install event
        const installCustomEvent = new CustomEvent('install');
        const installEvent = new InstallEvent();

        installCustomEvent.waitUntil = installEvent.waitUntil;
        self.dispatchEvent(installCustomEvent);
    }
}
