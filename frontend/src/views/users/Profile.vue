<template>
  <div class="profile">
    <div class="profile_box">
      <div class="title">
        <h3>
          <font-awesome-icon :icon="titleIcon" class="fa_icon_big" />
          <span>编辑个人资料</span>
        </h3>
      </div>
      <div class="from_box">
        <label>用户名：</label>
        <a-input v-model="user.username"></a-input>
      </div>
      <div class="from_box">
        <label>性别：</label>
        <a-radio-group name="radioGroup" :defaultValue="1" v-model="user.sex">
          <a-radio :value="1">男</a-radio>
          <a-radio :value="0">女</a-radio>
        </a-radio-group>
      </div>
      <div class="from_box">
        <label>兴趣：</label>
        <a-input placeholder="点回车增加兴趣" @keyup.enter="addInterest(hobby)" v-model="hobby"></a-input>
      </div>
      <div class="hobby_box">
        <ul>
          <li
            v-for="hobby in user.hobbies"
            :key="hobby"
            class="tag-style"
            :title="'点击移除兴趣：'+hobby"
            @click="removeInterest(hobby)"
          >
            <a-button>{{ hobby }}</a-button>
          </li>
        </ul>
      </div>
      <div class="from_box">
        <label>个人简介：</label>
        <textarea style="width:100%" v-model="user.introduction"></textarea>
      </div>
      <a-button type="primary" @click="updateProfile()">确认修改</a-button>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { Input, Radio, Button } from "ant-design-vue";
export default {
  name: "EditProfile",
  data() {
    return {
      hobby: "",
      titleIcon: faUserCog,
      user: {
        username: "", // 用户名
        sex: "", // 性别
        hobbies: [], // 兴趣
        introduction: "" // 个人简介
      }
    };
  },
  components: {
    FontAwesomeIcon,
    [Radio.name]: Radio,
    [Button.name]: Button,
    [Radio.Group.name]: Radio.Group,
    [Input.name]: Input
  },
  created() {
    const user = this.$store.state.user;
    if (user && typeof user === "object") {
      const { name, sex, hobbies, introduction } = user;
      this.username = name;
      this.sex = sex || this.sex;
      this.hobbies = hobbies || this.hobbies;
      this.introduction = introduction;
    }
  },
  methods: {
    initData() {},
    updateProfile() {
      const user = {
        username: this.username,
        sex: this.sex,
        hobbies: this.hobbies,
        introduction: this.introduction
      };
      this.$store.dispatch("updateUser", user).then(res => {
        console.log(res);
        alert("更新成功");
      });
    },
    addInterest(hobby) {
      this.hobby = "";
      hobby = hobby.replace(/[\s#]+/g, "");
      if (this.user.hobbies.includes(hobby)) {
        alert("已有该兴趣");
      } else if (hobby) {
        this.user.hobbies.push(hobby);
      }
    },
    removeInterest(hobby) {
      for (let i of this.user.hobbies.keys()) {
        if (this.user.hobbies[i] === hobby) {
          this.user.hobbies.splice(i, 1);
          break;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.profile {
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
    .hobby_box {
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          margin: 0px 4px 4px 0px;
        }
      }
    }
  }
}
</style>