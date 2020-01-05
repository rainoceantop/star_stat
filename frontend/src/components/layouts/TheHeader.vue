<template>
  <div class="header">
    <div class="primary_width layouts_box">
      <div class="logo">
        <router-link :to="{name:'home'}">
          <font-awesome-icon :icon="myIcon" class="fa_icon_mid" />
        </router-link>
      </div>
      <nav class="nav">
        <div class="nav_logged" v-if="auth">
          <router-link :to="{name:'Create'}" class="createbutton">
            <a-icon type="form" />
          </router-link>
          <a-dropdown>
            <a class="ant-dropdown-link">
              <img
                :src="`https://api.adorable.io/avatars/200/${user.username}.png`"
                class="nav_avatar"
              />
              <span class="nav_name">{{ user.username }}</span>
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item @click="column">
                <a-icon type="align-left" />个人专栏
              </a-menu-item>
              <a-menu-item @click="edit">
                <a-icon type="solution" />编辑资料
              </a-menu-item>
              <a-menu-item @click="logout">
                <a-icon type="logout" />退出登录
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="nav_user" v-else>
          <router-link :to="{name:'Login'}">
            <a-button type="primary">
              <a-icon type="user" />登录
            </a-button>
          </router-link>
          <router-link :to="{name:'Register'}">
            <a-button>
              <a-icon type="user-add" />注册
            </a-button>
          </router-link>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
import { Button, Icon, Dropdown, Menu } from "ant-design-vue";
import ls from "@/utils/localStorage";
import { faVuejs } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "TheHeader",
  data() {
    return {
      auth: ls.getItem("auth"),
      user: ls.getItem("user") ? ls.getItem("user") : {},
      myIcon: faVuejs
    };
  },
  components: {
    [Button.name]: Button,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Icon.name]: Icon,
    [Dropdown.name]: Dropdown,
    FontAwesomeIcon
  },

  methods: {
    column() {
      this.$router.push({ name: "Column", params: { uid: this.user._id } });
    },
    edit() {
      this.$router.push({ name: "EditUsers", params: { uid: this.user._id } });
    },
    logout() {
      ls.removeItem("auth");
      ls.removeItem("user");
      this.$store.state.auth = "";
      this.$store.state.user = "";
      this.$axios.post("http://192.168.0.106:3001/user/logout").then(res => {
        console.log(res);
      });
      // axios.post('http://192.168.0.106:3001/user/login', params)
      this.$router.push({ name: "Home" });
    }
  },
  watch: {
    "$store.state.auth": function() {
      this.auth = this.$store.state.auth;
    },
    "$store.state.user": function() {
      this.user = this.$store.state.user;
    }
  }
};
</script>
<style lang='less'>
.header {
  border-top: 3px solid @primary_color;
  background-color: #fff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
  .layouts_box {
    display: flex;
    height: 45px;
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
      .nav_logged {
        .ant-dropdown-link {
          img {
            border-radius: 50%;
            width: 30px;
            height: 30px;
            margin-right: 8px;
          }
        }
      }
    }
  }
}
</style>