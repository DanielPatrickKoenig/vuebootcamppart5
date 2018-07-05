import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Section from './components/SectionDetails.vue'
import Home from './components/Home.vue'

Vue.use(VueRouter)

// const Foo = { template: '<div>foo</div>' }
// const Bar = { template: '<div>bar</div>' }

// const routes = [
//   { path: '/foo', component: Foo },
//   { path: '/bar', component: Bar }
// ]

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/section/:sectionid',
      name: 'section',
      component: Section
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})

// const router = new VueRouter({
//   routes // short for `routes: routes`
// })

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
