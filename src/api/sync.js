import Http from '@js/http.js';

export default {
    async pullLibraryList() {
        const res = await Http.get('pullLibraryList');

        return res.data;
    },
    async pullLibrary() {
        const res = await Http.get('pullLibrary');

        return res.data;
    },
    async pushLibrary(lib) {
        if (lib) {
            const res = await Http.post('pushLibrary', lib);

            return res.data;
        }
    }
};