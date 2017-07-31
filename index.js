import 'babel-polyfill';
import SteveJobsWorker from './src/js/SteveJobsWorker';
import WebWorkerController from './src/js/WebWorkerController';

const ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';

if (typeof window !== 'undefined') {
    window.SteveJobsWorker = SteveJobsWorker;
}

if (ENVIRONMENT_IS_WORKER) {
    WebWorkerController.run();
}

export default SteveJobsWorker;
