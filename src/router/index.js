import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/todo'
        },
        {
            path: '/todo',
            name: 'todo',
            component: ()=> import('@views/todo'),
            meta: {
                title: '未完成任务',
                keepAlive: true
            }
        },
        {
            path: '/done',
            name: 'done',
            component: ()=> import('@views/done'),
            meta: {
                title: '已完成任务',
                keepAlive: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: ()=> import('@views/login'),
            meta: {
                title: '登录',
                keepAlive: true
            },
            props: true
        },
        {
            path: '/register',
            name: 'register',
            component: ()=> import('@views/register'),
            meta: {
                title: '注册',
                keepAlive: true
            }
        }
    ]
});
