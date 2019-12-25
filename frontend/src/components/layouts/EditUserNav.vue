<template>
  <div class="user_nav">
    <ul>
      <li>
        <router-link :to="{name:'profile',params:{uid:$store.state.user._id}}">
          <font-awesome-icon :icon="pro" style="width:24px;height:24px;" />个人信息
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'acatar',params:{uid:$store.state.user._id}}">
          <font-awesome-icon :icon="img" style="width:24px;height:24px;" />修改头像
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'editpassword',params:{uid:$store.state.user._id}}">
          <font-awesome-icon :icon="lock" style="width:24px;height:24px;" />修改密码
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { faIdCard, faImage, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "EditUserNav",
  data() {
    return {
      pro: faIdCard,
      img: faImage,
      lock: faLock
    };
  },
  props: ["uid"],
  components: {
    FontAwesomeIcon
  }
};
</script>

<style lang="less">
.user_nav {
  background-color: #fff;
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.3);
  padding: 20px;
  ul > li {
    padding: 10px;
    vertical-align: middle;
    font-size: 20px;
  }
}
</style>