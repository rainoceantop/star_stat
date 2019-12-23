<template>
  <header class="header">
    <div class="displaybox primary_width">
      <div class="logo">
        <h3>
          <router-link to="/">{{logo}}</router-link>
        </h3>
      </div>
      <nav class="nav">
        <router-link :to="{name: 'create' ,params:{aid :false}}" v-if="islogin">
          <font-awesome-icon :icon="createblog" style="width:24px;height:24px;" />
        </router-link>
        <router-link :to="{name:'list',params:{author:this.$store.state.user._id}}" v-if="islogin">
          <font-awesome-icon :icon="blog" style="width:24px;height:24px;" />
        </router-link>
        <router-link :to="{name:'index',params:{uid:this.$store.state.user._id}}" v-if="islogin">
          <font-awesome-icon :icon="useredit" style="width:24px;height:24px;" />
        </router-link>
        <router-link :to="{name:'login'}" v-if="!islogin">
          <font-awesome-icon :icon="userlogin" style="width:20px;height:20px;" />
        </router-link>
        <router-link :to="{name:'register'}" v-if="!islogin">
          <font-awesome-icon :icon="userregister" style="width:24px;height:24px;" />
        </router-link>
      </nav>
    </div>
  </header>
</template><script>
import {
  faUser,
  faBook,
  faBookMedical,
  faUserPlus,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "TheHeader",
  data() {
    return {
      logo: "blog",
      userlogin: faUser,
      userregister: faUserPlus,
      useredit: faUserCircle,
      blog: faBook,
      createblog: faBookMedical,
      islogin: false
    };
  },
  activated() {
    console.log("header");
    console.log(this.islogin);
  },
  watch: {
    "$store.state.user": function() {
      if (this.$store.state.user._id != "") {
        this.islogin = true;
      } else {
        this.islogin = false;
      }
    }
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
      align-items: center;
      a {
        margin-left: 16px;
      }
    }
  }
}
</style>