<template>
  <div class="article">
    <div class="article_show">
      <div class="title">
        <h4 v-bind:value="article.title">{{article.title}}</h4>
        <div class="edit_delete" v-if="isloginright">
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
    <!-- <div class="message">
      <label>评论</label>
      <input type="text" v-model="message" />
    </div>-->
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
      article: {},
      isloginright: false
    };
  },
  props: ["aid", "fresh"],
  components: {
    FontAwesomeIcon
  },
  created() {
    this.initData();
  },

  methods: {
    initData() {
      if (this.article != this.$store.article) {
        this.article = this.$store.article;
      } else {
        this.article = {};
      }
    },
    openArticles: function(aid) {
      this.$axios
        .get("http://192.168.0.113:3001/article/getArticle/" + aid)
        .then(res => {
          this.article = res.data.info;
          if (res.data.info.author === this.$store.state.user._id) {
            this.isloginright = true;
          } else {
            this.isloginright = false;
          }
          this.$store.commit("creataArticle", res.data.info);
        });
    },
    editarticle: function() {
      this.$router.push({
        name: "create",
        params: { aid: this.aid, iscreate: false }
      });
    },
    deletearticle: function(isloginright) {
      if (!isloginright) return;
      this.$axios
        .post("http://192.168.0.113:3001/article/delete", {
          aid: this.aid,
          author: this.$store.state.user._id
        })
        .then(res => {
          console.log(res);
          const { code } = res.data;
          if (code === 1) {
            this.$store.commit("removeArticle", this.aid);
          }
          this.$router.push({ name: "list" });
        });
    },
    iffresh: function() {
      if (this.fresh) {
        this.openArticles();
      }
    }
  },
  activated() {
    this.openArticles(this.aid);
  },
  watch: {
    aid: function(n) {
      this.openArticles(n);
    },
    fresh: function() {
      this.iffresh();
    }
  }
};
</script>

<style lang='less'>
@import "../../assets/less/articles.less";
</style>