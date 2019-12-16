<template>
  <div class="inputs_wrapper">
    <h3>登录</h3>
    <textInput label="用户名" type="text"></textInput>
    <textInput label="密码" type="password"></textInput>
    <button>登录</button>
    <div>
      <p>
        没有账号
        <router-link to="/register">注册！</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import textInput from "@/components/textInput.vue";
export default {
  name: "login",
  // data: function() {
  //   return {
  //     text:''
  //   };
  // },
  components: {
    textInput
  }
};
</script>

<style lang="less" scoped>
@primary_color: #42b983;
.inputs_wrapper {
  border-radius: 5px;
  margin: 15px auto;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 300px;
  padding: 12px;
  display: grid;
  gap: 16px 24px;
  h3 {
    text-align: left;
  }
}
</style>