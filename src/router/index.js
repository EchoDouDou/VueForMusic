import Vue from 'vue'
import Router from 'vue-router'
//import Recommend from '../components/recommend/recommend.vue'
//import Singer from '../components/singer/singer.vue'
//import Rank from '../components/rank/rank.vue'
//import Search from '../components/search/search.vue'
//import SingerDetail from '../components/singer-detail/singer-detail.vue'
//import Disc from '../components/disc/disc.vue'
//import TopList from '../components/top-list/top-list.vue'
//import UserCenter from '../components/user-center/user-center.vue'
Vue.use(Router)

const Recommend = (resolve)=>{
  import('../components/recommend/recommend.vue').then((module)=>{
    resolve(module)
  })
}

const Singer = (resolve)=>{
  import('../components/singer/singer.vue').then((module)=>{
    resolve(module)
  })
}

const Rank = (resolve)=>{
  import('../components/rank/rank.vue').then((module)=>{
    resolve(module)
  })
}

const Search = (resolve)=>{
  import('../components/search/search.vue').then((module)=>{
    resolve(module)
  })
}

const SingerDetail = (resolve)=>{
  import('../components/singer-detail/singer-detail.vue').then((module)=>{
    resolve(module)
  })
}

const Disc = (resolve)=>{
  import('../components/disc/disc.vue').then((module)=>{
    resolve(module)
  })
}

const TopList = (resolve)=>{
  import('../components/top-list/top-list.vue').then((module)=>{
    resolve(module)
  })
}

const UserCenter = (resolve)=>{
  import('../components/user-center/user-center.vue').then((module)=>{
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path:'/recommend',
      component:Recommend,
      children:[
        {
          path:':id',
          component:Disc
        }
      ]
    },
    {
      path:'/singer',
      component:Singer,
      children:[
        {
          path:':id',
          component:SingerDetail
        }
      ]
    },
    {
      path:'/search',
      component:Search,
      children:[
        {
          path:':id',
          component:SingerDetail
        }
      ]
    },
    {
      path:'/rank',
      component:Rank,
      children:[
        {
          path:':id',
          component:TopList
        }
      ]
    },
    {
      path:'/user',
      component:UserCenter
    }
  ]
})
