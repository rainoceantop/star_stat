<template>
  <div class="inputs_wrapper">
    <h3>登录</h3>
    <div class="wrapper_form" >
      <label class="form_label">用户名</label>
      <input class="form_text" type="text" required />
    </div>
    <div class="wrapper_form" >
      <label class="form_label">密码</label>
      <input class="form_text" type="password" required />
    </div>
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
export default {
  name: "login",
  data: function() {
    return {
      username: ''
    };
  },
  components: {
    
  },
  
};
</script>

<style lang="less" scoped>
@import '../assets/less/login.less';
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