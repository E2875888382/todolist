import Http from '@js/http.js';

export default {
    async pullLibraryList() {
        const res = await Http.get('pullLibraryList');

        return res.data;
    },
    async pullLibrary(lib) {
        const res = await Http.post('pullLibrary', lib);

        return res.data;
    },
    async pushLibrary(lib) {
        if (lib) {
            const res = await Http.post('pushLibrary', lib);

            return res.data;
        }
    },
    async newLibrary(lib) {
        const res = await Http.post('newLibrary', lib);

        return res.data;
    },
    async deleteLibrary(lib) {
        const res = await Http.post('deleteLibrary', lib);

        return res.data;
    }
};