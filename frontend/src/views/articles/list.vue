<template>
  <div class="article">
    <div class="article_list">
      <ul>
        <li v-for="item of articles" :key="item._id">
          <router-link :to="{name:'show',params:{aid: item._id}}">
            <h4>{{item.title}}</h4>
            <div>{{item.content}}</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      articles: []
    };
  },
  created() {
    this.getSelfArticles();
  },
  methods: {
    getSelfArticles() {
      this.$axios
        .post("http://192.168.0.112:3000/article/getSelfArticles")
        .then(res => {
          this.articles = res.data.info;
          console.log(res);
        });
    }
  }
};
</script>

<style>
</style>