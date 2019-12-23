<template>
  <div class="user">
    <div class="message">
      <div></div>
    </div>
    <div class="articles">
      <div class="articles_tab">
        <div>博客</div>
        <div>留言</div>
      </div>
      <div class="articles_list">
        <ul>
          <li v-for="item of articles" :key="item._id">
            <router-link :to="{name:'show',params:{aid: item._id}}">
              <h4>{{item.title}}</h4>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      articles: []
    };
  },
  porps: ["uid"],
  activated() {
    this.$axios
      .post("http://192.168.1.100:3001/article/getArticles/" + this.uid)
      .then(res => {
        this.articles = res.data.info;
        console.log(res);
      })
      .catch(err => console.error(err));
  }
};
</script>

<style>
</style>