<template>
  <div class="edit">
    <div class="edit_menu">
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
    <div class="edit_details">
      <h4>编辑个人信息</h4>
      <hr />
      <div class="from">
        <section class="wrapper_form">
          <label>原密码:</label>
          <input type="password" v-model="oldpassword" />
        </section>
        <section class="wrapper_form">
          <label>新密码:</label>
          <input type="password" v-model="newpassword" />
        </section>
        <section class="wrapper_form">
          <label>确认密码:</label>
          <input type="password" v-model="newconfirm" />
        </section>
        <section>
          <label>{{errorlabel}}</label>
        </section>
        <section>
          <input type="submit" @click="resetpassword" />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
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
.edit {
  width: 100%;
  display: flex;
  justify-content: space-between;
  &_menu {
    background-color: #fff;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.3);
    padding: 20px;
    ul > li {
      padding: 10px;
      vertical-align: middle;
      font-size: 20px;
    }
  }
  &_details {
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
    .wrapper_form {
      padding: 10px 0px;
      display: flex;
      label {
        width: 80px;
        font-size: 16px;

        text-align: right;
      }
      input {
        border: 0px;
        border-bottom: 1px solid #000;
        min-width: 200px;
      }
    }
  }
}
</style>