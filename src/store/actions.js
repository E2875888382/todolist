export default {
    async addDone({commit, getters: {getDatabase: db}}, id) {
        commit('addDone', id);
        await db.open();
        const temp = await db.get('task', id);

        await db.remove('task', id);
        await db.set('donetask', temp);
        db.close();
    },
    async addTodo({commit, getters: {getDatabase: db}}, id) {
        commit('addTodo', id);
        await db.open();
        const temp = await db.get('donetask', id);

        await db.remove('donetask', id);
        await db.set('task', temp);
        db.close();
    },
    async newTask({commit, getters: {getDatabase: db}}, newTask) {
        commit('newTask', newTask);
        await db.open();
        await db.set('task', newTask);
        const unsignTag = await db.getByIndex('tag', 'nameIndex', newTask.tag);

        await db.update('tag', Object.assign(unsignTag, {num: unsignTag.num + 1}));
        db.close();
    },
    async delTask({commit, getters: {getDatabase: db}}, id) {
        commit('delTask', id);
        await db.open();
        const deltask = await db.get('donetask', id);
        const decTag = await db.getByIndex('tag', 'nameIndex', deltask.tag);

        await db.remove('donetask', id);
        await db.update('tag', Object.assign(decTag, {num: decTag.num - 1}));

        db.close();
    },
    async newTag({commit, getters: {getDatabase: db}}, newTag) {
        commit('newTag', newTag);
        await db.open();
        await db.set('tag', newTag);
        db.close();
    },
    async delTag({commit, getters: {getDatabase: db}}, id) {
        commit('delTag', id);
        await db.open();
        await db.remove('tag', id);
        db.close();
    },
    async updateTask({commit, getters: {getDatabase: db}}, {oldTag, newTag, newTask}) {
        commit('editTask', {
            newTask: newTask,
            oldtag: oldTag
        });
        await db.open();
        if (newTag !== oldTag) {
            const decTarget = await db.getByIndex('tag', 'nameIndex', oldTag);
            const addTarget = await db.getByIndex('tag', 'nameIndex', newTag);

            if (decTarget) {
                await db.update('tag', Object.assign(decTarget, {num: decTarget.num >= 1 ? decTarget.num - 1 : 0}));
            }
            await db.update('tag', Object.assign(addTarget, {num: addTarget.num + 1}));
        }
        await db.update('task', newTask);
        db.close();
    },
    async saveTheme({commit, getters: {getDatabase: db}}, theme) {
        commit('changeTheme', theme);
        await db.open();
        await db.removeAll('theme');
        await db.set('theme', Object.assign(theme, {id: Number(new Date().getTime())}));
        db.close();
    },
    async login({commit, getters: {getDatabase: db}}, ifo) {
        if (ifo) {
            await db.open();
            await db.set('user', ifo);
            db.close();
            commit('login', ifo);
        }
    },
    async logout({commit, getters: {getDatabase: db}}) {
        await db.open();
        await db.removeAll('user');
        db.close();
        commit('logout');
    }
};