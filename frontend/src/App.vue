<template>
  <div id="app" class="layouts">
    <header class="layouts_header">
      <TheHeader />
    </header>
    <main class="layouts_main">
      <router-view />
    </main>
    <footer class="layouts_footer">
      <TheFooter />
    </footer>
  </div>
</template>


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
  },
  components: {
    TheHeader,
    TheFooter
  }
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a,
a:hover,
a:active,
a:visited,
a:link {
  text-decoration: none;
  color: #2c3e50;
}
hr {
  border: none;
  border-top: 1px solid #ddd;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
ul,
li {
  list-style: none;
}
.primary_width {
  max-width: 960px;
  margin: 0 auto;
}
main {
  min-height: calc(100vh - 96px);
  padding: 20px;
}
textarea,
input {
  outline: medium;
}
.layouts {
  background: #f1f3f5;
  display: grid;
  .layouts_header {
    background: white;
    height: 50px;
  }
  .layouts_main {
    min-height: calc(100vh - 100px);
  }
  .layouts_footer {
    height: 50px;
  }
}
@media screen and (max-width: 360px) {
  .layouts {
    width: 100%;
    max-width: 360px;
    .primary_width {
      margin: 0 auto;
      width: 100%;
    }
  }
}
@media screen and (max-width: 640px) {
  .layouts {
    width: 100%;
    max-width: 640px;
    .primary_width {
      margin: 0 auto;
      width: 100%;
    }
  }
}
.fa_icon_big {
}
</style>