<template>
  <div class="wrapper">
    <div class="article">
      <div class="article_show">
        <div class="title">
          <h4>{{article.title}}</h4>
          <div class="edit_delete" v-if="authorindex">
            <a @click="editarticle">
              <font-awesome-icon :icon="edit" style="width:24px;height:24px;" />
            </a>
            <a @click="deletearticle">
              <font-awesome-icon :icon="trash" style="width:24px;height:24px;" />
            </a>
          </div>
        </div>
        <div class="content">{{article.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "show",
  data() {
    return {
      edit: faEdit,
      trash: faTrash,
      article: {
        _id: "",
        title: "",
        content: "",
        author: ""
      },
      authorindex: false
    };
  },
  props: ["aid"],
  components: {
    FontAwesomeIcon
  },

  activated() {
    console.log("Activated" + "show");
    this.initData();
  },

  methods: {
    initData() {
      //未使用vuex
      this.$axios
        .get("http://192.168.0.100:3001/article/getArticle/" + this.aid)
        .then(res => {
          this.article = res.data.info;
        });
      // this.$store.dispatch("getArticle", this.aid).then(res => {
      //   this.article = res.data.info;
      // });
    },
    isAuthor() {
      console.log(this.article.author);
      console.log(this.$store.state.user._id);
      if (this.$store.state.user._id == this.article.author) {
        this.authorindex = true;
      }
    },
    editarticle: function() {
      this.$router.push({
        name: "update",
        params: { aid: this.aid }
      });
    },
    deletearticle: function() {
      //未使用vuex
      this.$axios
        .post("http://192.168.0.100:3001/article/delete", {
          aid: this.aid,
          author: this.$store.state.user._id
        })
        .then(res => {
          console.log(res);
          this.$router.push({
            name: "list",
            params: { author: this.$store.state.user._id }
          });
        })
        .catch(err => console.error(err));
      // this.$axios
      //   .post("http://192.168.0.100:3001/article/delete", {
      //     aid: this.aid,
      //     author: this.$store.state.user._id
      //   })
      //   .then(res => {
      //     const { code } = res.data;
      //     if (code === 1) {
      //       this.$store.commit("removeArticle", this.aid);
      //     }
      //     this.$router.push({
      //       name: "list",
      //       params: { author: this.$store.state.user._id }
      //     });
      //   });
    }
  },
  watch: {
    article() {
      this.isAuthor();
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../assets/less/articles.less";
</style>