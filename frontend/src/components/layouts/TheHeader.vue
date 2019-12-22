<template>
  <header class="header">
    <div class="displaybox primary_width">
      <div class="logo">
        <h3>
          <router-link to="/">{{logo}}</router-link>
        </h3>
      </div>
      <nav class="nav">
        <router-link :to="{name: 'create'}">
          <font-awesome-icon :icon="createblog" style="width:24px;height:24px;" />
        </router-link>
        <router-link :to="{name: 'update'}">
          <font-awesome-icon :icon="createblog" style="width:24px;height:24px;" />
        </router-link>
        <router-link to="/articles/list">
          <font-awesome-icon :icon="blog" style="width:24px;height:24px;" />
        </router-link>
        <router-link to="/login">
          <font-awesome-icon :icon="user" style="width:24px;height:24px;" />
        </router-link>
      </nav>
    </div>
  </header>
</template><script>
import {
  faUser,
  faBook,
  faBookMedical
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "TheHeader",
  data() {
    return {
      logo: "blog",
      user: faUser,
      blog: faBook,
      createblog: faBookMedical
      // islogin: Reflect.has(this.$store.state, "user")
    };
  },

  components: {
    FontAwesomeIcon
  }
};
</script><style lang='less'>
.header {
  background-color: #42b983;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);

  .displaybox {
    display: flex;
    height: 48px;
    padding: 0 12px;
    justify-content: space-between;
    align-items: center;

    .logo {
      font-size: 30px;
    }

    .nav {
      display: flex;

      a {
        margin-left: 16px;
      }
    }
  }
}
</style>