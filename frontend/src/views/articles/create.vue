<template>
  <div class="wrapper">
    <div class="wrapper_layout primary_width">
      <div class="create">
        <div class="create_box">
          <div class="title">
            <h2>{{ $route.name === "Edit" ? '编辑文章' : '创作文章' }}</h2>
          </div>
          <div class="from_box">
            <a-input v-model="article.title" placeholder="请输入文章标题"></a-input>
          </div>
          <div class="from_box">
            <textarea
              style="width:100%;min-height:200px;"
              placeholder="请输入文章内容"
              v-model="article.content"
            ></textarea>
          </div>
          <div class="from_box">
            <a-button type="primary" @click="post()">提交</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Create",
  data() {
    return {
      article: {
        author: "", //文章作者ID
        title: "", // 文章标题
        content: "" // 文章内容
      }
    };
  },

  props: ["uid", "articleId"],

  created() {
    this.initData();
    console.log(" created");
  },
  mounted() {
    console.log(" mounted");
  },
  methods: {
    editArticleNotification(message) {
      this.$notification.open({
        message: message,
        // description: "很高兴您能成为我们的一员",
        onClick: () => {
          console.log("Notification Clicked!");
        }
      });
    },
    iscreate() {
      return this.articleId == undefined;
    },
    initData() {
      if (this.iscreate()) {
        this.article.author = "";
        this.article.title = "";
        this.article.content = "";
      } else {
        this.$axios
          .get("http://192.168.0.106:3001/article/getArticle/" + this.articleId)
          .then(res => {
            this.article = res.data.info;
          });
      }
    },
    // 发布
    post() {
      const article = {
        author: this.article.author,
        title: this.article.title,
        content: this.article.content,
        articleId: this.articleId
      };
      // 如果标题和内容都不为空，提交发布
      if (article.title !== "" && article.content.trim() !== "") {
        if (this.iscreate()) {
          this.$store.dispatch("createArticle", article).then(res => {
            console.log(res);
            this.$router.push({
              name: "Content",
              params: {
                uid: res.data.info[0].author,
                articleId: res.data.info[0]._id
              }
            });
          });
        } else {
          console.log(article);
          this.$store.dispatch("updateArticle", article).then(res => {
            this.editArticleNotification(res.data.info);
            console.log(res);
            this.$router.push({
              name: "Content",
              params: {
                uid: this.article.author,
                articleId: this.articleId
              }
            });
          });
        }

        // 在控制台输出当前文章
      }
    }
  },
  watch: {
    $route: function() {
      this.initData();
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  &_layout {
    padding: 20px 0px;
    .create {
      padding: 30px 20px;
      background: white;
      margin: 20px 0px;
      &_box {
        .title {
          text-align: center;
          font-weight: bold;
          font-size: 24px;
          padding: 16px 0px;
        }
        .from_box {
          padding: 16px 0px;
        }
      }
    }
  }
}
</style>