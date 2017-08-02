/**
 * Tries to update an existing document in a PouchDB database and falls back to
 * creating a new one if no document exists.
 * @export
 * @param {PouchDB.Database} database The PouchDB instance where the data needs
 * to be inserted/updated.
 * @param {Object} data The new data that needs to be stored or updated in an
 * existing document. The _id property will be used to look for existing documents.
 * @returns {Promise<PouchDB.Core.Response>}
 */
export default async function upsert(database, data) {
    return database.get(data._id)
        .then(doc => database.put(Object.assign(doc, data)))
        .catch((err) => {
            if (err.status !== 404) {
                console.error('PouchDB error while upserting: ', err);
                return err;
            }

            return database.put(data);
        });
}
