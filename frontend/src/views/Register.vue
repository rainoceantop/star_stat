<template>
  <div class="inputs_wrapper">
    <h3>注册</h3>
    <div :class="['wrapper_form',mailitem]">
      <label class="form_label">邮箱</label>
      <input class="form_text" type="mail" v-model="mail" required />
    </div>
    <div :class="['wrapper_form',usernameitem]">
      <label class="form_label">用户名</label>
      <input class="form_text" type="text" v-model="username" required />
    </div>
    <div :class="['wrapper_form',passworditem]">
      <label class="form_label">密码</label>
      <input class="form_text" type="password" v-model="password" required />
    </div>
    <div :class="['wrapper_form',confirmitem]">
      <label class="form_label">确认密码</label>
      <input class="form_text" type="password" v-model="confirm" required />
    </div>
    <div v-if="error" :class="['message']">
      <p>{{errorlabel}}</p>
    </div>

    <button type="submit" class="submit" @click="register">注册</button>
    <div :class="['input_link']">
      <p>
        <router-link to="/forget">忘记密码？</router-link>
      </p>
      <p>
        已有账号
        <router-link to="/login">登录！</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      mail: "",
      username: "",
      password: "",
      confirm: "",
      e_reg: /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/,
      p_reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
      error: false,
      errorlabel: ""
    };
  },
  computed: {
    mailitem: function() {
      return this.mail.length === 0 ? "" : "keyup";
    },
    usernameitem: function() {
      return this.username.length === 0 ? "" : "keyup";
    },
    passworditem: function() {
      return this.password.length === 0 ? "" : "keyup";
    },
    confirmitem: function() {
      return this.confirm.length === 0 ? "" : "keyup";
    }
  },
  methods: {
    register: function() {
      if (this.username.length < 6) {
        this.error = true;
        this.errorlabel = "用户名字数必须大于2";
      } else if (!this.e_reg.test(this.mail)) {
        this.error = true;
        this.errorlabel = "请输入正确的邮箱";
      } else if (!this.p_reg.test(this.password)) {
        this.error = true;
        this.errorlabel = "密码至少包含 数字和英文，长度6-20";
      } else if (this.password !== this.confirm) {
        this.error = true;
        this.errorlabel = "两次输入的密码不一致";
      } else {
        this.error = false;
        // console.log("success");
        // console.log(!this.e_reg.test(this.mail));
        // console.log(!this.p_reg.test(this.password));
        // console.log(this.password !== this.confirm)
      }
    }
  }
};
</script>

<style lang="less">
@import "../assets/less/login.less";
</style>