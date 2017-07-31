export default class Cache {
    add(request) {
        console.log(request);
    }

    addAll(request) {
        request.forEach((request) => {
            this.add(request);
        });
    }
}
