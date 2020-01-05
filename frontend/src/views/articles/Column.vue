<template>
  <div class="wrapper">
    <div class="wrapper_layout primary_width">
      <div class="user">
        <div class="userbox">
          <div class="avatar">
            <router-link :to="{name:'Column',params:{uid:user.uid}}">
              <img :src="user.avatar" class="avatar-112 avatar img-thumbnail" />
            </router-link>
          </div>
          <div class="username">
            <router-link :to="{name:'Column',params:{uid:user.uid}}">{{ user.username }} 的专栏</router-link>
          </div>
          <hr />
          <div class="userbutton">
            <router-link :to="{name:'Column',params:{uid:user.uid}}">专栏文章</router-link>
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "Column",
  data() {
    return {
      user: {
        username: "",
        avatar: ""
      }
    };
  },
  props: ["uid"],
  computed: {},
  created() {
    this.initData();
  },
  methods: {
    initData() {
      console.log(this.uid);
      this.$axios
        .post("http://192.168.0.106:3001/user/userInfo", { uid: this.uid })
        .then(res => {
          this.user = {
            username: res.data.info.username,
            avatar: res.data.info.avatar
          };
          console.log(res);
        });
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