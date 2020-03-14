<template>
    <div style="height: 100%">
        <top v-if="show"/>
        <router-view/>
        <tabbar v-if="show"/>
    </div>
</template>

<script>
import {mapMutations} from 'vuex';
import initTags from '@json/initTags';
import themes from '@json/themes';
import dbConfig from '@json/dbConfig';
export default {
    components: {
        tabbar: ()=> import('@components/Footer'),
        top: ()=> import('@components/Header')
    },
    computed: {
        show: {
            get() {
                return this.$route.path !== '/login' && this.$route.path !== '/register';
            }
        }
    },
    methods: {
        ...mapMutations({
            syncTag: 'syncTag',
            syncTask: 'syncTask',
            syncDoneTask: 'syncDoneTask',
            login: 'login',
            changeTheme: 'changeTheme',
            saveDatabase: 'saveDatabase'
        })
    },
    created() {
        (async()=> {
            const db = new this.IndexDB('db1', dbConfig);

            await db.open();
            const task = await db.getAll('task');
            const donetask = await db.getAll('donetask');
            const theme = await db.getAll('theme');
            const tags = await db.getAll('tag');
            const user = await db.getAll('user');
            const startTheme = themes[1].theme;

            // 获取本地持久化的数据，同步到vuex
            this.syncTask(task);
            this.syncDoneTask(donetask);
            if (user.length !== 0) {
                this.login(user[user.length - 1]);
            }
            if (theme.length === 0) {
                this.changeTheme(startTheme);
                await db.set('theme', Object.assign(startTheme, {id: Number(new Date().getTime())}));
            } else {
                this.changeTheme(theme[0]);
            }
            if (tags.length === 0) {
                await db.setBatch('tag', initTags);
            } else {
                this.syncTag(tags);
            }
            db.close();
            this.saveDatabase(db);
        })();
    }
};
</script>

