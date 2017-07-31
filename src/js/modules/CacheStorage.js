import Cache from './Cache';

export default class CacheStorage {
    async open(name) {
        console.warn('NOT IMPLEMENTED CORRECTLY');
        return new Cache();
    }

    match() {
        throw 'not implemented';
    }

    has() {
        throw 'not implemented';
    }

    delete() {
        throw 'not implemented';
    }

    keys() {
        throw 'not implemented';
    }
}
