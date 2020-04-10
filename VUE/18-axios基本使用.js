const axios = require('axios');

// 配置全局 axios 默认值
axios.defaults.baseURL = 'http://localhost:3000';

// get 请求 方式一
// axios.get('http://localhost:3000/user?id=123').then((response) => {
//     console.log(response.data);
// }).catch((err) => {
//     console.log(err);
// });


// get 请求 方式二
// axios.get('http://localhost:3000/user', {
//     params: {
//         id: 1234
//     }
// }).then((response) => {
//     console.log(response.data);
// }).catch(err => {
//     console.log(err);
// })


// post 请求
// axios.post('http://localhost:3000/user', {
//     a: 10,
//     b: 20
// }).then(response => {
//     console.log(response.data);
// }).catch(err => {
//     console.log(err);
// })


// 并发执行多个请求
// function a() {
//     return axios.get('http://localhost:3000/user?id=111');
// }

// function b() {
//     return axios.post('http://localhost:3000/user', {
//         a: 30,
//         b: 40
//     })
// }

// axios.all([a(), b()]).then(
//     axios.spread((a, b) => {
//         console.log(a.data);
//         console.log(b.data);
//     })
// )


// axios 发请求 简写
// post 请求
// axios({
//     method: 'post',
//     url: 'http://localhost:3000/user',
//     data: {
//         a: 55,
//         b: 66
//     }
// }).then(response => {
//     console.log(response.data);
// }).catch(err => {
//     console.log(err);
// });

// get 请求
axios('/user/123', {
    baseURL: 'http://localhost:3000/',
    timeout: 1000   // 超时
}).then(response => {
    console.log(response.data);
}).catch(err => {
    console.log(err);
});