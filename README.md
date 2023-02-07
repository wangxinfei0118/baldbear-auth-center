# baldbear-auth-center

统一认证客户端，包括登录，注册，登出，管理 Cookie，刷新登陆状态(refresh Token)

原理：由认证客户端去服务器发送请求进行身份认证，将响应的登录状态（token）保存到Cookie中并将 Cookie 的域设置为顶域，实现登录状态（token）在同域系统中共享

## 快速开始

安装依赖：

```
npm install
```

启动项目：

```
npm run dev
```

打包：

```
npm run build
```

## 跨域

由于Cookie不可跨主域名，要实现不同域下的登录状态共享，可参考掘金上的一篇文章[前端需要了解的 SSO 与 CAS 知识](https://juejin.cn/post/6844903509272297480).