export default {
    login(state, ifo) {
        state.user = ifo;
    },
    logout(state) {
        state.user = null;
    },
    changeTheme(state, newTheme) {
        Object.keys(newTheme).forEach(key=> {
            document.documentElement.style.setProperty(key, newTheme[key]);
        });
        state.theme = newTheme;
    },
    addDone(state, id) {
        const todo = state.task.filter(item=> item.id !== id);
        const del = state.task.filter(item=> item.id === id);

        state.task = todo;
        state.doneTask.push(del[0]);
    },
    addTodo(state, id) {
        const done = state.doneTask.filter(item=> item.id !== id);
        const del = state.doneTask.filter(item=> item.id === id);

        state.doneTask = done;
        state.task.push(del[0]);
    },
    newTask(state, task) {
        const tag = task.tag;

        state.task.push(task);
        state.tags.forEach(item=> {
            if (item.name === tag) {
                item.num++;
            }
        });
    },
    delTask(state, id) {
        const rest = state.doneTask.filter(item=> item.id !== id);
        const del = state.doneTask.filter(item=> item.id === id);

        state.doneTask = rest;
        state.tags.forEach(item=> {
            if (item.name === del[0].tag) {
                item.num--;
            }
        });
    },
    newTag(state, tag) {
        state.tags.push(tag);
    },
    delTag(state, tagid) {
        state.tags = state.tags.filter(item=> item.id !== tagid);
    },
    editTask(state, {newTask, oldtag}) {
        const temp = [...state.task];

        let index;

        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === newTask.id) {
                index = i;
            }
        }
        temp.splice(index, 1, newTask);
        state.task = temp;
        const tags = [...state.tags];

        for (let j = 0; j < tags.length; j++) {
            if (tags[j].name === oldtag) {
                tags[j].num >= 1 && tags[j].num--;
            }
            if (tags[j].name === newTask.tag) {
                tags[j].num++;
            }
        }
        state.tags = tags;
    },
    sbt(state, str) {
        state.searchByTitle = '';
        state.search = '';
        state.searchByTag = str;
        state.search = str;
    },
    sbtitle(state, str) {
        state.searchByTag = '';
        state.search = '';
        state.searchByTitle = str;
        state.search = str;
    },
    showAll(state) {
        state.searchByTitle = '';
        state.searchByTag = '';
        state.search = '全部任务';
    },
    saveDatabase(state, obj) {
        state.db = obj;
    },
    syncTask(state, array) {
        state.task = array;
    },
    syncDoneTask(state, array) {
        state.doneTask = array;
    },
    syncTag(state, array) {
        state.tags = array;
    },
    syncLibrary(state, array) {
        state.library = array;
    }
};