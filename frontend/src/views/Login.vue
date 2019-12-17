<template>
  <div class="inputs_wrapper">
    <h3>登录</h3>
    <div :class="['wrapper_form',emailitem]">
      <label class="form_label">邮箱</label>
      <input class="form_text" type="text" v-model="email" required />
    </div>
    <div :class="['wrapper_form',passworditem]">
      <label class="form_label">密码</label>
      <input class="form_text" type="password" v-model="password" required />
    </div>
    <div v-if="error" :class="['message']">
      <p>账号或密码有误，请检查后重新输入</p>
    </div>
    <button type="submit" class="submit" @click="login">登录</button>
    <div :class="['input_link']">
      <p>
        <router-link to="/forget">忘记密码？</router-link>
      </p>
      <p>
        没有账号
        <router-link to="/register">注册！</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      e_reg: /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/,
      p_reg: /^[a-zA-Z0-9,./~!@#$%^&*()_+]{8,40}$/,
      error: false
    };
  },
  computed: {
    emailitem: function() {
      return this.email.length === 0 ? "" : "keyup";
    },
    passworditem: function() {
      return this.password.length === 0 ? "" : "keyup";
    }
  },
  methods: {
    login: function() {
      if (!(this.e_reg.test(this.email) && this.p_reg.test(this.password))) {
        this.error = true;
      } else {
        this.error = false;
        console.log("上传成功");
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/less/login.less";
</style>