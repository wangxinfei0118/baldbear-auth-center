import Cookies from 'js-cookie'

// Cookie的key值
export const Key = {
  userInfoKey: 'userInfo',
  accessTokenKey: 'accessToken',
  refreshTokenKey: 'refreshToken',
}

class CookieClass {
  constructor() {
    this.domain = process.env.VUE_APP_COOKIE_DOMAIN // 可以访问Cookie的域
    this.expireTime = 30 // Cookie有效期
  }

  set(key, value, expires, path = '/') {
    CookieClass.checkKey(key);
    Cookies.set(key, value, {expires: expires || this.expireTime, path: path, domain: this.domain})
  }

  get(key) {
    CookieClass.checkKey(key)
    return Cookies.get(key)
  }

  remove(key, path = '/') {
    CookieClass.checkKey(key)
    Cookies.remove(key, {path: path, domain: this.domain})
  }

  getAll() {
    Cookies.get();
  }

  static checkKey(key) {
    if (!key) {
      throw new Error('没有找到对应的key');
    }
    if (typeof key === 'object') {
      throw new Error('key不能是一个对象');
    }
  }
}

export const AuthCookie =  new CookieClass()
