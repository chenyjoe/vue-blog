import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Router from'./router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(mavonEditor)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(ViewUI)


Vue.prototype.getNowFormatDate=function(){
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

Vue.directive('tit',{
	bind(el){
		el.style.color='#'+Math.random().toString(16).slice(2,8);
	}
})
Vue.filter('toUppercase',function(value){
	return value.toUpperCase()
})
Vue.filter('snippet',function(value){
	return value.slice(0,100)+"..."
})

const router =new VueRouter({
	routes:Router,
	mode:'history'
})

new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')
