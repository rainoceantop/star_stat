<template>
  <div id="app">
    <header id="header">
      <div class="wrapper header_wrapper">
        <div class="logo">
          <h3>
            <router-link to="/" style="font-size:30px;">blog</router-link>
          </h3>
        </div>
        <nav>
          <router-link to="/login">
            <font-awesome-icon :icon="user" style="width:24px;height:24px;" />
          </router-link>
        </nav>
      </div>
    </header>
    <router-view />
    <footer>&copy;2019</footer>
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a{
  text-decoration: none;
  color: #2c3e50;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
}
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}
.header_wrapper{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: inherit;

}
#header {
  height: 50px;
  background: @primary_color;
  box-shadow: 0px 1px 1px rgba(0,0,0,0.2);
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: @primary_color;
    }
  }
}
</style>
<script>
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default{
  data(){
    return{
      user:faUser
    }
  },
  components:{
    FontAwesomeIcon
  }
}
</script>
