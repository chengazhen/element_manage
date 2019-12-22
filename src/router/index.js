import Vue from 'vue'
import VueRouter from 'vue-router'
// import { MessageBox } from 'element-ui';
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'login',
  component: () => import('@/views/login/index'),
  meta: {
    flag: true
  }
},
{
  path: "/manage",
  component: () => import('@/views/manage/index'),
  children: [{
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index'),
    }, {
      name: 'merchantList',
      path: 'merchantList',
      component: () => import('@/views/merchant/index'),
      meta: {
        path: ['数据管理', '商家列表']
      }
    }, {
      name: 'userList',
      path: 'userList',
      component: () => import('@/views/userList/index'),
      meta: {
        path: ['数据管理', '用户列表']
      }
    }, {
      name: 'foodList',
      path: 'foodList',
      component: () => import('@/views/foodList/index'),
      meta: {
        path: ['数据管理', '食品列表']
      }
    }, {
      name: 'orderList',
      path: 'orderList',
      component: () => import('@/views/orderList/index'),
      meta: {
        path: ['数据管理', '订单列表']
      }
    }, {
      name: 'anminList',
      path: 'anminList',
      component: () => import('@/views/anminList/index'),
      meta: {
        path: ['数据管理', '管理员列表']
      }
    }, {
      name: 'addStore',
      path: 'addStore',
      component: () => import('@/views/addStore/index'),
      meta: {
        path: ['添加数据', '添加商铺']
      }
    }, {
      name: 'addProduce',
      path: 'addProduce',
      component: () => import('@/views/addProduce/index'),
      meta: {
        path: ['添加数据', '添加商品']
      },
  },
  {
    name: 'userDis',
    path: 'userDis',
    component: () => import('@/views/userDis/index'),
    meta: {
      path: ['图表', '用户分布']
    }
  },
  {
    name: 'docEdit',
    path: 'docEdit',
    component: () => import('@/views/docEdit/index'),
    meta: {
      path: ['编辑', '文本编辑']
    }
  },
  {
    name: 'admin',
    path: 'admin',
    component: () => import('@/views/admin/index'),
    meta: {
      path: ['设置', '管理员设置']
    }
  },
  {
    name: 'explain',
    path: 'explain',
    component: () => import('@/views/explain/index'),
    meta: {
      path: ['说明', '说明']
    }
  },
]
}
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router