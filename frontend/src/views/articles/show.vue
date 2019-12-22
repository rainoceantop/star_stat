<template>
  <div class="article">
    <div class="article_show">
      <div class="title">
        <h4 v-bind:value="article.title">{{article.title}}</h4>
        <div class="edit_delete" v-if="isauthor">
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
      isauthor: false
    };
  },
  props: ["aid"],
  components: {
    FontAwesomeIcon
  },
  beforeCreate() {
    console.log("beforeCreate" + "show");
  },
  created() {
    console.log("created" + "show");
  },
  beforeMount() {
    console.log("beforeMount" + "show");
  },
  mounted() {
    console.log("mounted" + "show");
  },
  // beforeUpdate() {
  //   console.log("beforeUpdate" + "show");
  // },
  // updated() {
  //   console.log("updated" + "show");
  // },
  beforeActivated() {
    console.log("beforeActivated" + "show");
  },
  activated() {
    console.log("Activated" + "show");
    // this.changeDate();
    this.initData();
    this.isAuthor();
  },
  beforeDestory() {
    console.log("beforeDestory" + "show");
  },
  destoryed() {
    console.log("destoryed" + "show");
  },
  methods: {
    initData() {
      // this.$store.dispatch("getArticle", this.aid).then(res => {
      //   this.article = res.data.info;
      //   this.$store.commit("getArticle", res.data.info);
      // });
    },
    isAuthor() {
      if (this.$store.state.user._id == this.article.author) {
        this.isauthor = true;
      } else {
        this.isauthor = false;
      }
    },
    changeDate() {
      if (this.$store.state.article == this.article) {
        console.log("不需改变");
      } else {
        console.log("需要改变");
        let filtered = this.$store.state.articles.filter(item => {
          return item._id == this.aid;
        });
        console.log(filtered);
        this.article = this.$store.state.article;
      }
    }
  }

  // methods: {
  //   initData() {
  //     if (this.article != this.$store.article) {
  //       this.article = this.$store.article;
  //     }
  //   },
  //   openArticles: function(aid) {
  //     this.$axios
  //       .get("http://192.168.1.100:3001/article/getArticle/" + aid)
  //       .then(res => {
  //         this.article = res.data.info;
  //         if (res.data.info.author === this.$store.state.user._id) {
  //           this.isloginright = true;
  //         } else {
  //           this.isloginright = false;
  //         }
  //         this.$store.commit("creataArticle", res.data.info);
  //       });
  //   },
  //   editarticle: function() {
  //     this.$router.push({
  //       name: "create",
  //       params: { aid: this.aid, iscreate: false }
  //     });
  //   },
  //   deletearticle: function(isloginright) {
  //     if (!isloginright) return;
  //     this.$axios
  //       .post("http://192.168.1.100:3001/article/delete", {
  //         aid: this.aid,
  //         author: this.$store.state.user._id
  //       })
  //       .then(res => {
  //         console.log(res);
  //         const { code } = res.data;
  //         if (code === 1) {
  //           this.$store.commit("removeArticle", this.aid);
  //         }
  //         this.$router.push({ name: "list" });
  //       });
  //   }
  // },
};
</script>

<style lang='less'>
@import "../../assets/less/articles.less";
</style>