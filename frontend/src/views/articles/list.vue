<template>
  <div class="article">
    <div class="article_list">
      <ul>
        <li v-for="item of articles" :key="item._id">
          <router-link :to="{name:'show',params:{aid: item._id, iscreate:false}}">
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
  props: ["author"],
  beforeCreate() {
    console.log("beforeCreate" + "list");
  },
  created() {
    console.log("created" + "list");
    this.initData();
    // this.getSelfArticles();
  },
  beforeMount() {
    console.log("beforeMount" + "list");
  },
  mounted() {
    console.log("mounted" + "list");
  },
  // beforeUpdate() {
  //   console.log("beforeUpdate" + "list");
  // },
  // updated() {
  //   console.log("updated" + "list");
  // },
  beforeActivated() {
    console.log("beforeActivated" + "list");
  },
  activated() {
    console.log("Activated" + "list");
    this.changeDate();
  },
  beforeDestory() {
    console.log("beforeDestory" + "list");
  },
  destoryed() {
    console.log("destoryed" + "list");
  },
  methods: {
    initData() {
      if (this.articles.length <= 0) {
        console.log("需要调取后台数据");
        this.$store.dispatch("getSelfArticles").then(res => {
          this.articles = res.data.info;
          this.$store.commit("getSelfArticles", this.articles);
        });
      } else {
        console.log("不需要调取后台数据i");
      }
    },
    changeDate() {
      if (this.$store.state.articles == this.articles) {
        console.log("不需要改变c");
      } else {
        console.log("需要改变c");
        this.articles = this.$store.state.articles;
      }
    }
  }
  // methods: {
  //   getSelfArticles() {
  //     console.log("getSelfArticles");
  //     if (this.$store.state.articles != this.articles) {
  //       this.$axios
  //         .post("http://192.168.1.100:3001/article/getSelfArticles")
  //         .then(res => {
  //           this.articles = res.data.info;
  //           this.$store.commit("getSelfArticles", res.data.info);
  //         });
  //     } else {
  //       console.log(this.articles);
  //       console.log(this.$store.state.articles);
  //       if (this.articles != this.$store.state.articles) {
  //         this.articles = this.$store.state.articles;
  //       }
  //       // this.data.articles = this.$store.state.articles;
  //     }
  //   }
  // }
};
</script>

<style>
</style>