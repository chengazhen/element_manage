import axios from 'axios'
import {
  Loading
} from 'element-ui';
export {
  baseUrl,
  imgBaseUrl
}
var loading;
//基本请求地址
let baseUrl = axios.defaults.baseURL = 'https://elm.cangdu.org';
//基本图片请求地址
const imgBaseUrl = 'https://elm.cangdu.org/img/';
//查看当前环境(开发/生产)
console.log(process.env.NODE_ENV)
// 打开跨域携带cookie
axios.defaults.withCredentials = true
//设置5秒后未响应自动断开
axios.defaults.timeout = 10000;
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // loading = Loading.service({
  //   fullscreen: false,
  //   background:"rgba(0, 0, 0, 0.8)"
  // });
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // loading.close();
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default {
  postLogin(user_name, password) {
    return axios.post('/admin/login', {
      user_name,
      password
    }).then(res => res).catch(res => {
      console.log(res)
    })
  },
  //获取用户列表
  getUserList(offset, limit) {
    return axios.get(`/v1/users/list?offset=${offset}&limit=${limit}`).then(res => {
      console.log(res);
      return res.data;
    }).catch(res => {
      console.log(res);
    })
  },
  //获取用户数量
  getUserCount: axios.get("/v1/users/count").then(res => res.data.count).catch(res => {
    console.log(res)
  }),
  //获取商铺列表
  getMerchant(params) {
    return axios.get(`/shopping/restaurants?latitude=${params.latitude}&longitude=${params.longitude}&offset=${params.offset}&limit=${params.limit}`).then(res => res.data).catch(res => {
      console.log(res);
    })
  },
  //获取商户数量
  getMerCount() {
    return axios.get('/shopping/restaurants/count').then(res => res.data.count).catch(res => {
      console.log(res);
    })
  },
  // 获取商品详情
  getGoodsDetail(params) {
    return axios.get('/shopping/v2/menu/' + params)
  },
  //获取商店详情
  getShopDetail(params) {
    return axios.get('/shopping/restaurant/' + params)
  },
  //获取食品列表
  getFoodList(offset, limit) {
    return axios.get(`/shopping/v2/foods?offset=${offset}&limit=${limit}&restaurant_id=undefined`).then(res => res.data).catch(res => {
      console.log(res);
    })
  },
  // 获取食品数量
  getFoodCount() {
    return axios.get(`/shopping/v2/foods/count`).then(res => res.data.count).catch(res => {
      console.log(res);
    })
  },
  //获取食品种类
  getFoodCategory(params) {
    return axios.get('/shopping/v2/menu/' + params)
  },
  //获取订单数量
  getOrderCount() {
    return axios.get(`/bos/orders/count`).then(res => res.data.count).catch(res => {
      console.log(res);
    })

  },
  // 获取订单列表
  getOrderList(offset, limit) {
    return axios.get(`/bos/orders?offset=${offset}&limit=${limit}&restaurant_id=undefined`).then(res => res.data).catch(res => {
      console.log(res);
    })

  },
  // 获取管理员数量
  getAdminCount() {
    return axios.get(`/admin/count`).then(res => res.data.count).catch(res => {
      console.log(res);
    })
  },
  // 获取管理员列表
  getAdminList(offset, limit) {
    return axios.get(`/admin/all?offset=${offset}&limit=${limit}`).then(res => res.data.data).catch(res => {
      console.log(res);
    })
  },
  //添加店铺
  postAddShop(form) {
    console.log(form)
    return axios.post('/shopping/addshop', {
      name: form.name,
      address: form.address,
      phone: form.phone,
      latitude: form.latitude,
      longitude: form.longitude,
      category: form.category,
      image_path: form.image_path,
      float_delivery_fee: form.float_delivery_fee,
      float_minimum_order_amount: form.float_minimum_order_amount,
      description: form.description,
      promotion_info: form.promotion_info,
      is_premium: form.is_premium,
      delivery_mode: form.delivery_mode,
      news: form.news,
      bao: form.bao,
      zhun: form.zhun,
      piao: form.piao,
      startTime: form.startTime,
      endTime: form.endTime,
      business_license_image: form.business_license_image,
      catering_service_license_image: form.catering_service_license_image,
      activities: form.activities,
    }).then(res =>
      res.data
    ).catch(res => {
      console.log(res)
    })
  },
  // 获取商铺种类
  getShopSort() {
    return axios.get(`/shopping/v2/restaurant/category`).then(res => res.data).catch(res => {
      console.log(res);
    })
  },
  //获取所在城市
  getCity() { //res.data.name
    return axios.get(`/v1/cities?type=guess`).then(res => res.data).catch(res => {
      console.log(res);
    })
  },
  //通过关键字定位
  getLocation(city_id, keyword) {
    return axios.get(`/v1/pois`, {
      params: {
        city_id: city_id,
        keyword: keyword
      }
    }).then(res => res.data).catch(res => {
      console.log(res);
    })
  },
  //获取管理员信息
  getAdimData() {
    return axios.get('/admin/info').then(res => res.data).catch(res => {
      console.log(res)
    })
  },
  // 退出登录
  getSignOut() {
    return axios.get('/admin/singout').catch(res => {
      console.log(res)
    })
  },
  //请求某天用户注册量
  getSignCount(params) {
    return axios.get(`/statis/user/${params}/count`).catch(res => {
      console.log(res)
    })
  },
  //获取全部注册用户
  getAallCount() {
    return axios.get('/v1/users/count').catch(res => {
      console.log(res)
    })
  },
  //获取某天注册的管理员数量
  getAdimCount(params) {
    return axios.get(`/statis/admin/${params}/count`).catch(res => {
      console.log(res)
    })
  },
  //获取所有的管理员数量
  getAdminAll(params) {
    return axios.get('/admin/count').catch(res => {
      console.log(res)
    })
  },
  //获取某天的订单数量
  getOrder(params) {
    return axios.get(`/statis/order/${params}/count`).catch(res => {
      console.log(res)
    })
  },
  //获取所有的订单数量
  getAllOrder() {
    return axios.get(`/bos/orders/count`).catch(res => {
      console.log(res)
    })
  },
  //获取某个店铺的食品种类
  getProduceSort(params) {
    return axios.get(`/shopping/getcategory/${params}`)
  },
  //添加某个商店的食品种类
  postAddGoodsSort(params) {
    return axios.post('/shopping/addcategory', params);
  },
  //添加商品
  postAddProduce(params) {
    return axios.post('/shopping/addfood', params)
  },
  //获取城市分布
  getCityUser() {
    return axios.get('/v1/user/city/count');
  },
  //更新餐馆
  postUpdata(params) {
    return axios.post('/shopping/updateshop', params)
  },
  //删除餐馆
  deleteShop(params) {
    console.log(params)
    return axios.delete(`/shopping/restaurant/${params}`)
  },
  //更新食品
  upDataGoods(params) {
    console.log(params)
    return axios.post("/shopping/v2/updatefood",
      params
    );
  }
}