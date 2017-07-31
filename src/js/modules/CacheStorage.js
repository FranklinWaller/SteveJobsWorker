import Cache from './Cache';

export default class CacheStorage {
    async open(name) {
        return new Cache(name);
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
