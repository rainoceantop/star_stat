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
  //   components: {
  //     VueSimplemde
  //   },
  methods: {
    createArticle: function() {
      if (this.title.length < 2 || this.content.length < 10) {
        this.error = true;
        this.errorlable = "标题必须文字必须大于2，文章内容必须大于10";
      } else {
        this.error = false;
        this.$store
          .dispatch("createArticle", {
            title: this.title,
            content: this.content
          })
          .then(res => {
            if (res == res) {
              this.$store.commit("creataArticle", {
                title: this.title,
                content: this.content
              });
              console.log(res);
              console.log("提交给store存储");
              this.$router.push("/articles/show");
            }
          });
        console.log("123");
      }
    }
  }
};
</script>

<style lang='less'>
@import "~simplemde/dist/simplemde.min.css";
@import "../../assets/less/articles.less";
</style>