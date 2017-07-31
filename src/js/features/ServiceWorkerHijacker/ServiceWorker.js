// Remember old methods
let originalServiceWorkerRegister = null;

export default class ServiceWorker {
    static init(orginalServiceWorkerMethods) {
        originalServiceWorkerRegister = orginalServiceWorkerMethods.register;
    }

    static async register(src) {
        if (originalServiceWorkerRegister) {
            return originalServiceWorkerRegister.apply(this, arguments);
        }
    }
}
