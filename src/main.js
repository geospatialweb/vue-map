'use strict';

import Vue from 'vue'
import App from './components/App.component.vue'
import { mapService } from './services/map.service';

new Vue({
    render: h => h(App),
}).$mount('#app');

mapService.loadMap();
