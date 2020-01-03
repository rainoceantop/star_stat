<template>
  <div class="wrapper">
    <div class="wrapper_layout primary_width">
      <div class="user">
        <div class="userbox">
          <div class="avatar">
            <router-link :to="{name:'Column',params:{uid:uid}}">
              <img
                :src="`https://api.adorable.io/avatars/200/${user.username}.png`"
                class="avatar-112 avatar img-thumbnail"
              />
            </router-link>
          </div>
          <div class="username">
            <router-link :to="{name:'Column',params:{uid:uid}}">{{ user.username }} 的专栏</router-link>
          </div>
          <hr />
          <div class="userbutton">
            <router-link :to="{name:'Column',params:{uid:uid}}">专栏文章（{{ articleNum }}）</router-link>
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import ls from "@/utils/localStorage";
export default {
  name: "Column",
  data() {
    return {
      //   user: ls.getItem("user") ? ls.getItem("user") : {}
    };
  },
  props: ["uid"],
  computed: {
    // 将指定的状态混入计算属性
    ...mapState(["user", "articles"]),
    // 基于 user 返回用户名
    userName() {
      return this.user && this.user.name;
    },
    // 基于 user 返回用户头像
    userAvatar() {
      return this.user && this.user.avatar;
    },
    // 基于 articles 返回文章数量
    articleNum() {
      return this.articles ? this.articles.length : 0;
    }
  },
  activated() {
    console.log("column.activated");
    this.initData();
  },
  methods: {
    initData() {
      //提交用户ID（路由获得）,获取该用户的所有信息
      //     this.$axios.post();
      //res返回用户该用户的所有
      //
      //   if (this.$router.params.uid) {
      //     this.$axios.post();
      //   }
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  padding-top: 20px;
  &_layout {
    display: grid;
    gap: 20px;
    grid-template-columns: 20% 80%;
    justify-items: stretch;
    align-items: start;
    .user {
      .userbox {
        background: white;
        padding: 10px;
        text-align: center;
        display: grid;
        gap: 20px;
        .avatar {
          img {
            border-radius: 50%;
            width: 120px;
            height: 120px;
          }
        }
        .username,
        .userbutton {
          a {
            color: #333;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 640px) {
  .wrapper_layout {
    width: 100%;
    max-width: 640px;
    display: grid;
    gap: 20px;
    grid-template-columns: 100% !important;
    grid-template-areas:
      "a"
      "b";
    .user {
      width: 90%;
      margin: 10px auto 10px auto;
    }
  }
}
</style>