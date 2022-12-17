import request from "@/utils/request";

const auth = {
    username: 'baldbear-admin',
    password: '123456'
}

const headers = {
    "Content-Type": "application/x-www-form-urlencoded"
}

// 用户登录
export function login(params){
    return request({
        auth,
        headers,
        url: "/auth/login",
        method: "post",
        params
    })
}

// 提交注册信息
export function register(data) {
    return request({
        auth,
        headers,
        url: `/auth/register`,
        method: 'post',
        data
    })
}


// 使用refreshToken重新获取登录状态
export function refresh(refreshToken){
    return request({
        auth,
        headers,
        url: '/auth/refresh',
        method: 'get',
        params:{
            refreshToken
        }
    })
}

// 请求协议
export function getXieyi() {
    return request({
        url: `${window.location.href.replace('login','')}/xieyi.html`, //  public/xieyi.html
        method: 'get'
    })
}

// 查询用户名是否存在
export function usernameExists(username) {
    return request({
        url: `/system/username/${username}`,
        method: 'get'
    })
}

// 用户退出
export function logout(accessToken) {
    return request({
        url: `/system/logout`,
        method: 'get',
        params: {
            accessToken
        }
    })
}

