import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import VueMaterial from 'vue-material'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'vue-material/dist/vue-material.css'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import navbar from '@/components/Navbar'
import Questions from '@/components/Questions'
import searchbox from '@/components/searchbox'
import questions from '@/components/Questions'
import showquestion from '@/components/ShowQuestion'
import createquestion from '@/components/CreateQuestion'
import register from '@/components/register'

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue);
Vue.use(Router)
Vue.use(VueMaterial)
Vue.component('navbar',navbar)
Vue.component('searchbox',searchbox)
Vue.component('questions',questions)
Vue.component('showquestion',showquestion)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Questions',
      name: 'Questions',
      component: Questions
    },
    {
      path: '/showquestion',
      name: 'showquestion',
      component: showquestion
    },
    {
      path: '/createquestion',
      name: 'createquestion',
      component: createquestion
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})
