import Vue from 'vue';
import App from '@views/app.vue';
import store from '@store/index.js';
import router from '@router/index.js';
import 'view-design/dist/styles/iview.css';
import '@css/common.css';
import {IndexDBVuePlugin} from 'mini-idb';
import {Avatar, Drawer, Button, ButtonGroup, Affix, Icon, List, Input, Form, FormItem} from 'view-design';
import {Picker, Cell, CellGroup, Tabbar, TabbarItem, NavBar, Popup, Row, Col, Dialog, Field, Toast, Uploader} from 'vant';

Vue.config.productionTip = false;

const vueUse = arr=> {
    arr.forEach(i=> {
        Vue.use(i);
    });
};
const vueComponent = arr=> {
    arr.forEach(([name, component])=> {
        Vue.component(name, component);
    });
};

vueComponent([
    ['Avatar', Avatar],
    ['Drawer', Drawer],
    ['Button', Button],
    ['ButtonGroup', ButtonGroup],
    ['Affix', Affix],
    ['Icon', Icon],
    ['List', List],
    ['ListItem', List.Item],
    ['Input', Input],
    ['i-input', Input],
    ['Form', Form],
    ['FormItem', FormItem]
]);
vueUse([
    Uploader,
    Toast,
    IndexDBVuePlugin,
    Tabbar,
    TabbarItem, 
    NavBar, 
    Popup, 
    Row, 
    Col, 
    Dialog, 
    Field, 
    Cell, 
    CellGroup, 
    Picker
]);
new Vue({
    el: '#app',
    store,
    render: c=> c(App),
    router
});
