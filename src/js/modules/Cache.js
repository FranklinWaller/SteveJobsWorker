import PouchDB from 'pouchdb';
import SaveableRequest from './custom/SaveableRequest';
import SaveableResponse from './custom/SaveableResponse';

export default class Cache {
    constructor(name) {
        this.name = name;
        this._database = new PouchDB(name);
    }

    async add(requestOrUrl) {
        let request = requestOrUrl;

        if (typeof requestOrUrl === 'string') {
            request = new Request(requestOrUrl);
        }

        const response = await fetch(request);

        if (!response.ok) throw new TypeError('bad status code');

        return this.put(request, response);
    }

    async put(request, response) {
        const saveableRequest = new SaveableRequest(request);
        const saveableResponse = new SaveableResponse(response);

        const databaseResponse = await this._database.put({
            _id: request.url,
            request: await saveableRequest.toString(),
            response: await saveableResponse.toString(),
        });

        console.log(databaseResponse);
    }

    addAll(requests) {
        const promises = requests.map(request => this.add(request));

        return Promise.all(promises);
    }
}
