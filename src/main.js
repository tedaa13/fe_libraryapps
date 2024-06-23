import { createApp } from 'vue'
import App from './App.vue'

//import bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import "datatables.net-bs4";

import router from './router';

const app = createApp(App);
app.use(VueSweetalert2);
app.use(router);

app.mount('#app');

// createApp(App).mount('#app')
