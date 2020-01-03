<template>
  <div class="wrapper">
    <div class="article">
      <div class="article_list">
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
  name: "list",
  data() {
    return {
      articles: [],
      change: true
    };
  },
  props: ["author"],
  activated() {
    console.log("Activated" + "list");
    this.initData();
  },
  methods: {
    initData() {
      //未使用vuex
      this.$axios
        .post(
          "http://192.168.0.100:3001/article/getArticles/" +
            this.$store.state.user._id
        )
        .then(res => {
          this.articles = res.data.info;
        })
        .catch(err => console.error(err));
      // this.$store.dispatch("getSelfArticles", this.author).then(res => {
      //   this.articles = res.data.info;
      //   this.$store.commit("getSelfArticles", res.data.info);
      // });
    }
  }
};
</script>

<style lang="less" scoped>
</style>