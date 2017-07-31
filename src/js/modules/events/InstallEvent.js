import ExtendableEvent from './ExtendableEvent';

export default class InstallEvent extends ExtendableEvent {
    constructor() {
        super();

        this.activeWorker = null;
    }
}
