<template>
  <div class="inputs_wrapper">
    <h3>忘记密码？</h3>
    <div :class="['wrapper_form',mailitem]">
      <label class="form_label">邮箱</label>
      <input class="form_text" type="mail" v-model="mail" required />
    </div>
    <div v-if="error" :class="['message']">
      <p>{{errorlabel}}</p>
    </div>
    <button type="submit" class="submit" @click="email">发送验证到邮箱</button>
    <div :class="['input_link']">
      <p>
        <router-link to="/register">注册？</router-link>
      </p>
      <p>
        <router-link to="/login">登录！</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "forget",
  data() {
    return {
      mail: "",
      e_reg: /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/,
      p_reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
      error: false,
      errorlabel: ""
    };
  },
  computed: {
    mailitem: function() {
      return this.mail.length === 0 ? "" : "keyup";
    }
  },
  methods: {
    email: function() {
      if (!this.e_reg.test(this.mail)) {
        this.error = true;
        this.errorlabel = "请输入正确的邮箱";
      } else {
        this.error = false;
        console.log("符合条件发送成功")
      }
    }
  }
};
</script>

<style lang="less">
@import "../assets/less/login.less";
</style>