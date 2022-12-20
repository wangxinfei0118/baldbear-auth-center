import Vue from "vue";
import Vuex from "vuex"
import {Key, AuthCookie} from "@/utils/cookie";
import {login, logout, refresh} from "@/api/auth";

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        userInfo: AuthCookie.get(Key.userInfoKey) ? JSON.parse(AuthCookie.get(Key.userInfoKey)) : null,
        accessToken: AuthCookie.get(Key.accessTokenKey),
        refreshToken: AuthCookie.get(Key.refreshTokenKey),
    },
    mutations:{
        // 保存用户信息
        setUserState(state,data){
            const { userInfo, access_token, refresh_token} = data
            state.userInfo = userInfo
            state.accessToken = access_token
            state.refreshToken = refresh_token
            // 将数据保存到cookie中
            AuthCookie.set(Key.userInfoKey, JSON.stringify(userInfo))
            AuthCookie.set(Key.accessTokenKey, access_token)
            AuthCookie.set(Key.refreshTokenKey, refresh_token)
        },

        // 重置用户状态
        resetUserState(state){
            state.userInfo = null
            state.accessToken = null
            state.refreshToken = null
            // 移除cookie中数据
            AuthCookie.remove(Key.userInfoKey)
            AuthCookie.remove(Key.accessTokenKey)
            AuthCookie.remove(Key.refreshTokenKey)

        }
    },
    actions:{
        toLogin({commit}, userData){
            return new Promise((resolve, reject) => {
                login(userData).then(res =>{
                    if (res.code === 20000){
                        commit('setUserState',res.data)
                    }
                    resolve(res)

                }).catch((err) =>{
                    commit('resetUserState')
                    reject(err)
                })
            })
        },

        toLogout({state, commit}, redirectURL){
            logout(state.accessToken).then(() =>{
                commit('resetUserState')
                //重定向回原页面
                window.location.href = redirectURL || '/'
            }).catch(() =>{
                commit('resetUserState')
                //重定向回原页面
                window.location.href = redirectURL || '/'
            })
        },

        toRefresh({state, commit}){
            return new Promise((resolve, reject) => {
                if (!state.refreshToken){
                    // refreshToken不存在，重置用户数据
                    commit('resetUserState')
                    reject('您的身份已过期，请重新登录')
                }
                else {
                    refresh(state.refreshToken).then(res =>{
                        //更新数据
                        if (res.code === 20000){
                            commit('setUserState', res.data)
                            resolve()
                        }
                        else {
                            reject('您的身份已过期，请重新登录')
                        }
                    }).catch(() =>{
                        // 重置用户数据
                        commit('resetUserState')
                        reject('您的身份已过期，请重新登录')
                    })
                }
            })
        }
    },
})
export default store