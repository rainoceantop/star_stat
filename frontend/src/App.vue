<template>
  <div id="app">
    <TheHeader />
    <main>
      <keep-alive>
        <router-view />
      </keep-alive>
    </main>
    <TheFooter />
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: #2c3e50;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
}
.primary_width,
main {
  max-width: 1200px;
  margin: 0 auto;
}
main {
  min-height: calc(100vh - 96px);
  padding: 20px;
}
input {
  outline: medium;
}
</style>
<script>
import TheHeader from "@/components/layouts/TheHeader.vue";
import TheFooter from "@/components/layouts/TheFooter.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  created() {
    // 判断后台是否记录用户信息
    this.$store.dispatch("isLogin");
    console.log("qwe");
  },
  components: {
    TheHeader,
    TheFooter
  }
};
</script>
