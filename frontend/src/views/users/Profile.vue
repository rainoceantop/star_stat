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
            <label>用户名:</label>
            <input type="text" v-model="user.username" class="input" />
          </section>
          <section class="form_box">
            <label>性别:</label>
            <select v-model="user.sex">
              <option disabled value>请选择</option>
              <option>男</option>
              <option>女</option>
            </select>
          </section>
          <section class="form_box">
            <label>兴趣:</label>
            <input
              type="text"
              @keyup.enter="addInterest(interest)"
              v-model="interest"
              placeholder="按回车键添加兴趣"
              class="input"
            />
          </section>
          <div class="interestlist">
            <ul>
              <li
                v-for="inte in user.interests"
                :key="inte"
                class="tag-style"
                :title="'点击移除标签：'+inte"
                @click="removeInterest(inte)"
              >{{ inte }}</li>
            </ul>
          </div>
          <section class="form_box">
            <label>个人简介:</label>
            <textarea v-model="user.profile" cols="30" rows="3"></textarea>
          </section>
          <section class="form_box">
            <input class="button" type="submit" />
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
      interest: "",
      user: {
        username: "",
        sex: "",
        interests: [],
        profile: ""
      }
    };
  },
  props: ["uid"],
  components: {
    FontAwesomeIcon
    // EditUserNav
  },

  methods: {
    addInterest(interest) {
      this.interest = "";
      interest = interest.replace(/[\s#]+/g, "");
      if (this.user.interests.includes(interest)) {
        alert("已有该兴趣");
      } else if (interest) {
        this.user.interests.push(interest);
      }
    },
    removeInterest(interest) {
      for (let i of this.user.interests.keys()) {
        if (this.user.interests[i] === interest) {
          this.user.interests.splice(i, 1);
          break;
        }
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
  },
  activated() {
    this.islogin();
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
            margin-bottom: 4px;
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
          flex: 1;
          border: 0px;
          border-bottom: 1px solid #000;
          min-width: 200px;
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