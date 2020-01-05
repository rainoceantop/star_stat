<template>
  <div class="register_box">
    <div class="primary_width">
      <div class="form_wrapper">
        <h3>请登录</h3>
        <div :class="['wrapper_form',emailitem]">
          <label class="form_label">邮箱</label>
          <input class="form_text" type="text" v-model="user.email" required />
        </div>
        <div :class="['wrapper_form',passworditem]">
          <label class="form_label">密码</label>
          <input class="form_text" type="password" v-model="user.password" required />
        </div>
        <div v-if="error" :class="['message']">
          <p>{{errorlabel}}</p>
        </div>
        <a-button type="primary" @click="login">登录</a-button>
        <div :class="['input_link']">
          <p>
            没有账号
            <router-link :to="{name:'Register'}">注册！</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Button } from "ant-design-vue";
import ls from "@/utils/localStorage";
export default {
  name: "register",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      e_reg: /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/,
      p_reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
      error: false,
      errorlabel: ""
    };
  },
  components: {
    [Button.name]: Button
  },
  computed: {
    emailitem: function() {
      return this.user.email.length === 0 ? "" : "keyup";
    },
    passworditem: function() {
      return this.user.password.length === 0 ? "" : "keyup";
    }
  },

  methods: {
    login: function() {
      if (!this.e_reg.test(this.user.email)) {
        this.error = true;
        this.errorlabel = "请输入正确的邮箱";
      } else if (!this.p_reg.test(this.user.password)) {
        this.error = true;
        this.errorlabel = "密码至少包含 数字和英文，长度6-20";
      } else {
        this.error = false;
        const user = {
          email: this.user.email,
          password: this.user.password
        };
        ls.setItem("user", user);
        this.$store
          .dispatch("login", user)
          .then(res => {
            if (res.data.code === 1) {
              this.$store.commit("login", res.data.info);
              this.$store.commit("UPDATE_AUTH", true);
              this.$router.push("/");
            } else {
              this.error = true;
              this.errorlabel = "请输入正确的邮箱和密码";
            }
          })
          .catch(err => console.error(err));
        // ls.setItem("user", user);
        this.$store.dispatch("login", user);
      }
    }
  }
};
</script>
<style lang="less">
.register_box {
  .primary_width {
    .form_wrapper {
      max-width: 300px;
      margin: 20px auto;
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      background-color: #fff;
      color: #2c3e50;
      padding: 12px;
      display: grid;
      gap: 24px 32px;
      padding: 20px;
      border-radius: 10px;
      background: white;
      .input_link {
        display: flex;
        justify-content: space-between;
      }
      h3 {
        text-align: left;
        font-size: 24px;
      }
      .message {
        color: red;
      }
      .submit {
        cursor: pointer;
        height: 30px;
        background: @primary_color;
        border: 0px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        font-size: 18px;
      }
      .keyup {
        .form_label {
          font-size: 12px !important;
          line-height: 12px;
          bottom: 8px !important;
          z-index: 0 !important;
        }
        .form_text {
          font-size: 12px !important;
          padding-top: 12px;
        }
      }
      .wrapper_form {
        border: 1px solid #333;
        transition: all 1s;
        position: relative;
        .form_label {
          pointer-events: none;
          user-select: none;
          text-indent: 8px;
          bottom: 0px;
          transition: all 1s;
          transform: 1s;
          position: absolute;
          line-height: 36px;
          font-size: 18px;
          z-index: 0;
          pointer-events: none;
          user-select: none;
          cursor: text;
        }
        .form_text {
          text-indent: 8px;
          transition: all 1s;
          background-color: rgba(0, 0, 0, 0);
          transform: 1s;
          border: rgba(44, 62, 80, 0.5);
          width: 100%;
          height: 36px;
          z-index: 1000;
        }
      }
      .keying_form {
        position: relative;
        height: 48px;
        .form_label {
          pointer-events: none;
          user-select: none;
          cursor: text;
          position: absolute;
          left: 0;
          top: 0;
          font-size: 12px;
          // z-index: -1;
        }

        .form_text {
          position: absolute;
          left: 0;
          top: 0;
          font-size: 12px;
          width: 100%;
          padding-top: 12px;
          height: 36px;
          background: rgba(0, 0, 0, 0);
          border: rgba(44, 62, 80, 0.8);
        }
      }
    }

    @keyframes keyuplabel {
      from {
        font-size: 18px;
      }

      to {
        font-size: 12px;
      }
    }
  }
}
</style>