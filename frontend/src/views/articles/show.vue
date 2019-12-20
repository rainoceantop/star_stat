<template>
  <div class="article">
    <div class="article_show">
      <div class="title">
        <h4>{{article.title}}</h4>
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
  props: ["aid"],
  components: {
    FontAwesomeIcon
  },
  created() {
    console.log("222222222222222");
    this.openArticles(this.aid);
  },

  methods: {
    openArticles: function(aid) {
      this.$axios
        .get("http://192.168.0.112:3000/article/getArticle/" + aid)
        .then(res => {
          console.log(res);
          this.article = res.data.info;
          if (res.data.info.author === this.$store.state.user._id) {
            this.isloginright = true;
          } else {
            this.isloginright = false;
          }
        });
    },
    editarticle: function() {
      console.log();
    },
    deletearticle: function() {
      console.log("delete");
    }
  },
  watch: {
    aid: function(n) {
      this.openArticles(n);
    }
  }
};
</script>

<style lang='less'>
@import "../../assets/less/articles.less";
</style>