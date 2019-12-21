<template>
  <div class="article">
    <div class="article_create">
      <div class="title">
        <label>标题</label>
        <input type="text" v-model="title" />
      </div>
      <div class="content">
        <label>内容</label>
        <textarea name id cols="60" rows="20" v-model="content"></textarea>
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
</template>

<script>
// import VueSimplemde from "vue-simplemde";
export default {
  name: "create",
  data() {
    return {
      title: "",
      content: "",
      error: false,
      errorlable: ""
    };
  },
  props: ["aid", "iscreate"],
  created() {
    // this.hasArticle();
    this.initData();
  },
  methods: {
    initData() {
      this.error = false;
      this.errorlable = "";
      if (this.iscreate) {
        this.title = "";
        this.content = "";
      } else {
        const article = this.$store.state.articles.filter(
          item => item._id === this.aid
        )[0];
        if (article) {
          this.title = article.title;
          this.content = article.content;
        }
      }
    },
    createArticle: function() {
      if (this.title.length < 2 || this.content.length < 10) {
        this.error = true;
        this.errorlable = "标题必须文字必须大于2，文章内容必须大于10";
      } else {
        if (this.aid == null) {
          this.error = false;
          this.$store
            .dispatch("createArticle", {
              title: this.title,
              content: this.content
            })
            .then(res => {
              console.log(res);
              if (res.data.code === 1) {
                this.$store.commit("creataArticle", res.data.info);
                const id = res.data.info[0]._id;
                this.$store.state.articles.unshift(res.data.info[0]);
                this.$router.push({
                  name: "show",
                  params: { aid: id, fresh: false }
                });
              } else {
                alert("服务器繁忙");
              }
            });
        } else {
          this.$store
            .dispatch("updateArticle", {
              aid: this.aid,
              title: this.title,
              content: this.content,
              author: this.$store.state.article.author
            })
            .then(res => {
              console.log(res);
              if (res.data.code === 1) {
                console.log(this.$store.state.article);
                this.$store.commit("creataArticle", {
                  aid: this.aid,
                  title: this.title,
                  content: this.content,
                  author: this.$store.state.article.author
                });
                console.log(this.aid);
                this.$router.push({
                  // path: `/show/${this.aid}`,
                  // query: { fresh: true }
                  name: "show",
                  params: { aid: this.aid, fresh: true }
                });
              }
            });
        }
      }
    }
  },
  watch: {
    aid: function() {
      this.initData();
    }
  }
};
</script>

<style lang='less'>
@import "~simplemde/dist/simplemde.min.css";
@import "../../assets/less/articles.less";
</style>