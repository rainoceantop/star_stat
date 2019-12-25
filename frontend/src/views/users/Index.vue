<template>
  <div class="wrapper">
    <div class="wrapper_user"></div>
    <div class="wrapper_articles">
      <div class="articles">
        <div class="articles_tab">
          <div>博客</div>
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
  props: ["uid"],
  activated() {
    console.log(this.uid);
    this.$axios
      .post("http://192.168.1.100:3001/article/getArticles/" + this.uid)
      .then(res => {
        this.articles = res.data.info;
      })
      .catch(err => console.error(err));
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
}
</style>