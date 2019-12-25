<template>
  <div class="wrapper">
    <div class="wrapper_nav">
      <!-- <EditUserNav /> -->
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
    </div>
    <div class="wrapper_details">
      <div class="user_details">
        <h4>编辑个人信息</h4>
        <hr />
        <div class="from">
          <section class="form_box">
            <label>原密码:</label>
            <input type="password" v-model="oldpassword" class="input" />
          </section>
          <section class="form_box">
            <label>新密码:</label>
            <input type="password" v-model="newpassword" class="input" />
          </section>
          <section class="form_box">
            <label>确认密码:</label>
            <input type="password" v-model="newconfirm" class="input" />
          </section>
          <section>
            <label>{{errorlabel}}</label>
          </section>
          <section class="form_box">
            <input class="button" type="submit" @click="resetpassword" />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import EditUserNav from "@/components/layouts/EditUserNav.vue";
import { faIdCard, faImage, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "profile",
  data() {
    return {
      pro: faIdCard,
      img: faImage,
      lock: faLock,
      p_reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
      error: false,
      errorlabel: "",
      oldpassword: "",
      newpassword: "",
      newconfirm: ""
    };
  },
  props: ["uid"],
  activated() {
    this.islogin();
  },
  components: {
    FontAwesomeIcon
    // EditUserNav
  },
  methods: {
    resetpassword() {
      if (!this.p_reg.test(this.oldpassword)) {
        this.error = true;
        this.errorlabel = "密码至少包含 数字和英文，长度6-20";
      } else if (!this.p_reg.test(this.newpassword)) {
        this.error = true;
        this.errorlabel = "密码至少包含 数字和英文，长度6-20";
      } else if (this.password !== this.confirm) {
        this.error = true;
        this.errorlabel = "两次输入的密码不一致";
      } else {
        this.error = false;
        //修改密码API
      }
    },
    islogin() {
      if (Reflect.has(this.$store.state.user, "_id")) {
        if (!(this.$store.state.user._id === this.uid)) {
          this.$router.push("/");
        }
      } else {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="less" scpoed>
.wrapper {
  width: 80%;
  display: flex;
  margin: 0 auto;
  &_nav {
    margin-right: 30px;
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
  }
  &_details {
    flex: 1;
    .user_details {
      box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.3);
      padding: 20px;
      background-color: #fff;
      h4 {
        text-align: left;
        font-size: 32px;
      }
      .interestlist {
        ul {
          text-align: left;
          li {
            display: inline-block;
            margin-right: 4px;
            padding: 4px;
            background: @primary_color;
            color: #fff;
            cursor: pointer;
          }
        }
      }
      .form_box {
        padding: 10px 0px;
        display: flex;
        label {
          width: 80px;
          font-size: 16px;

          text-align: right;
        }
        .input {
          border: 0px;
          border-bottom: 1px solid #000;
          min-width: 200px;
          flex: 1;
        }
        .button {
          border: 0;
          background: @primary_color;
          width: 100px;
          height: 40px;
          font-size: 24px;
          color: white;
        }
      }
    }
  }
}
</style>