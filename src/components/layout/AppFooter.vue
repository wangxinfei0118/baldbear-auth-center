<template>
  <div class="footer">
    <div class="mr-2">Copyright © 2022-2023 baldbear.cn All Rights Reserved.</div>
    <div>
      <a href="https://beian.miit.gov.cn/" target="_blank">备案号：冀ICP备2022030887号</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.footer {
  height: 80px;
  background-color: rgb(244, 245, 245);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: rgb(136, 136, 136);
}
a {
  text-decoration:none;
}
a:link {
  color:rgb(136, 136, 136);
}
a:visited {
  color:rgb(136, 136, 136);
}

</style>