import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import importBootstrapVue from '@/importation/bootstrap-vue';
import '@/importation/icons';
import {loadDB} from './db';

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
Vue.component('fa-icon', FontAwesomeIcon);

//import {fas} from '@fortawesome/free-solid-svg-icons'


Vue.config.productionTip = false;


importBootstrapVue(Vue);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
loadDB(store);
