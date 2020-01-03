<template>
  <div class="password">
    <div class="password_box">
      <div class="title">
        <h3>
          <font-awesome-icon :icon="titleIcon" class="fa_icon_big" />
          <span>修改密码</span>
        </h3>
      </div>
      <div class="from_box">
        <label>旧密码：</label>
        <a-input type="password" v-model="oldpassword"></a-input>
      </div>
      <div class="from_box">
        <label>新密码：</label>
        <a-input type="password" v-model="newpassword"></a-input>
      </div>
      <div class="from_box">
        <label>确认密码：</label>
        <a-input type="password" v-model="newconfirm"></a-input>
      </div>
      <div v-if="error" :class="['message']">
        <p>{{errorlabel}}</p>
      </div>
      <div class="from_box">
        <a-button type="primary" @click="updatePassword">确认修改</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { Input, Button } from "ant-design-vue";
export default {
  name: "EditPassword",
  data() {
    return {
      titleIcon: faUserLock,
      oldpassword: "",
      newpassword: "",
      newconfirm: "",
      p_reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
      error: false,
      errorlabel: ""
    };
  },
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
    FontAwesomeIcon
  },
  methods: {
    updatePassword() {
      if (this.oldpassword != this.$store.state.user.password) {
        this.error = true;
        this.errorlabel = "密码错误重新输入";
      } else if (!this.p_reg.test(this.newpassword)) {
        this.error = true;
        this.errorlabel = "密码至少包含 数字和英文，长度6-20";
      } else if (this.newpassword !== this.newconfirm) {
        this.error = true;
        this.errorlabel = "两次输入的密码不一致";
      } else {
        this.error = false;
        const password = this.newpassword;
        this.$store.dispatch("updateUser", { password: password });
        alert("更新成功");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.password {
  &_box {
    .title {
      font-size: 24px;
      font-weight: bold;
      h3 {
        display: flex;
        align-items: center;
      }
    }
    .from_box {
      display: flex;
      padding: 8px 0px;
      align-items: center;
      label {
        text-align: right;
        min-width: 80px;
      }
    }
  }
}
</style>