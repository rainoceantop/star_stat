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
import { Input, Button } from "ant-design-vue";
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
  components: {
    [Input.name]: Input,
    [Button.name]: Button
  },
  props: ["uid", "articleId"],
  created() {
    this.initData();
  },
  mounted() {
    console.log("create mounted");
  },
  methods: {
    initData() {
      console.log(this.uid, this.articleId);
      if (this.articleId == undefined) {
        console.log("create");
      } else {
        console.log("edit");
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
        this.$store.dispatch("post", article).then(res => {
          console.log(res);
          this.$router.push({
            name: "Content",
            params: {
              uid: this.$store.state._id,
              articleId: res.data.info[0]._id
            }
          });
        });
        // 在控制台输出当前文章
      }
    }
  },
  watch: {
    $route: function() {
      if (this.$route.name == "Edit") {
        console.log("edit");
      } else if (this.$route.name == "Create") {
        console.log("Create");
      }
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