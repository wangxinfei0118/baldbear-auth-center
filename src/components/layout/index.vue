<template>
  <div class="layout">
    <app-header></app-header>
    <div class="main">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";
export default {
  name: "index",
  components: {AppFooter, AppHeader},
}
</script>

<style scoped>
.layout{
  height: 100vh;
  width: 100%;
  background: url(../../assets/image/background.jpg) no-repeat center center;
  background-size: cover;
}
.main{
  height: calc(100vh - 160px);
}
</style>