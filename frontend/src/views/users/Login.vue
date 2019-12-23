<template>
  <div class="inputs_wrapper">
    <h3>登录</h3>
    <div :class="['wrapper_form',mailitem]">
      <label class="form_label">邮箱</label>
      <input class="form_text" type="text" v-model="email" required />
    </div>
    <div :class="['wrapper_form',passworditem]">
      <label class="form_label">密码</label>
      <input class="form_text" type="password" v-model="password" required />
    </div>
    <div v-if="error" :class="['message']">
      <p>{{errorlabel}}</p>
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
      p_reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
      error: false,
      errorlabel: ""
    };
  },
  beforeCreate() {
    console.log("beforeCreate" + "login");
  },
  created() {
    console.log("created" + "login");
  },
  beforeMount() {
    console.log("beforeMount" + "login");
  },
  mounted() {
    console.log("mounted" + "login");
  },
  beforeActivated() {
    console.log("beforeActivated" + "login");
  },
  activated() {
    console.log("beforeActivated" + "login");
  },

  beforeDestory() {
    console.log("beforeDestory" + "login");
  },
  destoryed() {
    console.log("destoryed" + "login");
  },
  computed: {
    mailitem: function() {
      return this.email.length === 0 ? "" : "keyup";
    },
    passworditem: function() {
      return this.password.length === 0 ? "" : "keyup";
    }
  },
  methods: {
    login: function() {
      if (!this.e_reg.test(this.email)) {
        this.error = true;
        this.errorlabel = "请输入正确的邮箱";
      } else if (!this.p_reg.test(this.password)) {
        this.error = true;
        this.errorlabel = "密码至少包含 数字和英文，长度6-20";
      } else {
        this.error = false;
        this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password
          })
          .then(res => {
            console.log(res);
            if (res.data.code === 1) {
              this.$store.commit("login", res.data.info);
              console.log(res);
              this.$router.push("/");
            } else {
              this.error = true;
              this.errorlabel = "请输入正确的邮箱和密码";
              console.log();
            }
          })
          .catch(err => console.error(err));
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/login.less";
</style>