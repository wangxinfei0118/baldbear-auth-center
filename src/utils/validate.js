// 校验用户名是否合法 只允许4-30位数字、字母和下划线
export function isvalidUsername(str) {
  const valid_map = /^[a-zA-Z0-9_]{4,30}$/
  return valid_map.test(str)
}

// 校验手机号是否合法
export function isvalidMobile(str) {
  const valid_map = 11 && /^1(3|4|5|6|7|8|9)\d{9}$/
  return valid_map.test(str)
}
  
// 校验邮箱是否合法
export function isvalidEmail(str) {
  const valid_map = /^[A-Za-z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return valid_map.test(str)
}

