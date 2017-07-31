export default class SaveableResponse {
    constructor(response) {
        this.response = response;
    }

    async toString() {
        return {
            status: this.response.status,
            blob: await this.response.blob(),
        };
    }
}
