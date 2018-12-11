import Vue from 'vue';
import AppComponent from './components/App.component.vue';
import mapService from './services/map.service';

Vue.config.productionTip = false;

new Vue({
	render: h => h(AppComponent),
}).$mount('#app');

mapService.loadMap();
