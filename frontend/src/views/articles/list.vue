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
  created() {},
  activated() {
    this.getSelfArticles();
  },
  methods: {
    getSelfArticles() {
      if (this.$store.state.articles.length === 0) {
        this.$axios
          .post("http://192.168.0.113:3001/article/getSelfArticles")
          .then(res => {
            this.articles = res.data.info;
            console.log("调取后台list");
            this.$store.commit("getSelfArticles", res.data.info);
          });
      } else {
        this.data.articles = this.$store.state.articles;
      }
    }
  }
};
</script>

<style>
</style>