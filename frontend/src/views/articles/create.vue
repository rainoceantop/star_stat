<template>
  <div class="wrapper">
    <div class="article">
      <div class="article_create">
        <div class="title">
          <label>标题</label>
          <input type="text" v-model="article.title" />
        </div>
        <div class="content">
          <label>内容</label>
          <textarea name id cols="60" rows="20" v-model="article.content"></textarea>
          <!-- <vue-simplemde v-model="content" ref="markdownEditor" /> -->
        </div>
        <div v-if="error" :class="['message']">
          <p>{{errorlable}}</p>
        </div>
        <div class="submit">
          <button @click="createArticle">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {
        aid: "",
        title: "",
        content: "",
        author: ""
      },
      error: false,
      errorlable: "",
      routename: this.$route.name
    };
  },
  props: ["aid"],
  beforeCreate() {
    console.log("beforeCreate" + "create");
  },
  created() {
    console.log("created" + "create");
  },
  beforeMount() {
    console.log("beforeMount" + "create");
  },
  mounted() {
    console.log("mounted" + "create");
  },
  beforeActivated() {
    console.log("beforeActivated" + "create");
  },
  activated() {
    console.log("Activated" + "create");
    this.initData();
  },
  beforeDestory() {
    console.log("beforeDestory" + "create");
  },
  destoryed() {
    console.log("destoryed" + "create");
  },
  methods: {
    initData() {
      //未使用vuex
      if (this.$route.name === "update") {
        this.$axios
          .get("http://192.168.1.100:3001/article/getArticle/" + this.aid)
          .then(res => {
            // console.log(res);
            this.article = res.data.info;
          })
          .catch(err => console.error(err));
      } else if (this.$route.name === "create") {
        this.article = {
          aid: "",
          title: "",
          content: "",
          author: ""
        };
      }
      //使用vuex
      // if (this.$route.name === "update") {
      //   this.$store.dispatch("getArticle", this.aid).then(res => {
      //     this.article = res.data.info;
      //     this.$store.commit("getArticle", res.data.info);
      //     this.title = res.data.info.title;
      //     this.content = res.data.info.content;
      //   });
      // }
    },
    createArticle() {
      if (this.article.title.length < 2 || this.article.content.length < 10) {
        this.error = true;
        this.errorlable = "标题必须文字必须大于2，文章内容必须大于10";
      } else {
        if (this.$route.name === "create") {
          //未使用状态管理仓库
          this.$axios
            .post("http://192.168.1.100:3001/article/create", {
              title: this.article.title,
              content: this.article.content
            })
            .then(res => {
              console.log(res);
              this.$router.push({
                name: "show",
                params: { aid: res.data.info[0]._id }
              });
            })
            .catch(err => console.error(err));
          // this.$store
          //   .dispatch("createArticle", {
          //     title: this.title,
          //     content: this.content
          //   })
          //   .then(res => {
          //     this.$store.commit("createArticle", res.data.info[0]);
          //     const id = res.data.info[0]._id;
          //     this.$router.push({ name: "show", params: { aid: id } });
          //   });
        } else if (this.$route.name === "update") {
          console.log(this.article);
          this.$axios
            .post("http://192.168.1.100:3001/article/update", this.article)
            .then(res => {
              console.log(res);
              this.$router.push({
                name: "show",
                params: { aid: this.aid }
              });
            })
            .catch(err => console.error(err));
          // this.$store
          //   .dispatch("updateArticle", {
          //     aid: this.$route.params.aid,
          //     title: this.title,
          //     content: this.content,
          //     author: this.$store.state.user._id
          //   })
          //   .then(res => {
          //     if (res.data.code === 1) {
          //       this.$store.commit("updateArticle", {
          //         aid: this.$route.params.aid,
          //         title: this.title,
          //         content: this.content,
          //         author: this.$store.state.user._id
          //       });
          //       this.$router.push({ name: "show", params: { aid: this.aid } });
          //     }
          //   });
        }
      }
    }
  },
  watch: {
    $route: function() {
      this.initData();
    }
  }
  // watch: {
  //   $route: function() {
  //     if (this.$route.name === "update") {
  //       this.initData();
  //     } else if (this.$route.name === "create") {
  //       this.title = "";
  //       this.content = "";
  //     }
  //   }
  // }
};
</script>

<style lang='less' scoped>
@import "../../assets/less/articles.less";
</style>