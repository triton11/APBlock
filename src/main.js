import Vue from 'vue'
import Router from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import One from './components/instructions/One.vue'
import Home from './components/Home.vue'
import GoneViral from './components/biology/gone_viral.vue'
import Chatbot from './components/spanish/chatbot.vue'
import BallBounce from './components/physics/ball_bounce.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
//Add unimported components to ignore list to prevent warnings.
Vue.config.ignoredElements = ['field','block','category','xml','mutation','value','sep']

Vue.use(Router)

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const router = new Router({
 mode: 'history',
 routes: [
    {
     path: '/',
     name:'home',
     component: Home
    },
    {
     path: '/biology/viral',
     name:'viral',
     component: GoneViral,
     props:true,
    },
    {
      path: '/instructions',
     name:'one',
     component: One,
     props:true,
    },
    {
     path: '/physics/ball_bounce',
     name:'ball_bounce',
     component: BallBounce,
     props:true,
    },
    {
     path: '/spanish/chatbot',
     name:'chatbot',
     component: Chatbot,
     props:true,
    }
 ]
})

new Vue({
 el: '#app',
 render: h => h(App),
 router
})