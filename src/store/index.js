import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

Vue.use(Vuex);

const state = {
    user: null,
    task: [],
    doneTask: [],
    tags: [
        {
            name: '旅游', 
            num: 0,
            color: 'orange',
            id: 1573992704601 
        },
        {
            name: '个人',
            num: 0,
            color: 'green',
            id: 1573992704602 
        },
        {
            name: '生活',
            num: 0,
            color: 'yellow',
            id: 1573992704603 
        },
        {
            name: '工作',
            num: 0,
            color: 'blue',
            id: 1573992704604 
        },
        {
            name: '未标签',
            num: 0,
            color: 'gray',
            id: 1573992704605 
        }
    ],
    searchByTag: '',
    searchByTitle: '',
    search: '',
    theme: {
        '--theme-header-icon': '#333',
        '--theme-header-text': '#333',
        '--theme-header-bg': '#f7f8fa',
        '--theme-search-content-bg': '#fff',
        '--theme-search-icon': '#333',
        '--theme-font-color': '#000',
        '--theme-popup-bg': '#fff',
        '--theme-task-bg': '#fff',
        '--theme-btn-shadow': '#9e9e9e'
    },
    db: {}
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});