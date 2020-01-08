<template>
  <div class="articleslist">
    <div class="articleslistbox">
      <div class="title">
        <h3>文章专栏</h3>
        <a-button type="primary" @click="create" v-if="auth">
          <a-icon type="highlight" />创作文章
        </a-button>
      </div>
      <div class="articles">
        <ul>
          <li v-for="(article,index) in articles" :key="index">
            <router-link :to="`/${article.author}/articles/${article._id}/content`" class="title">
              <img :src="article.avatar" class="avatar" />
              <span>{{ article.title }}</span>
            </router-link>
            <span class="meta pull-right">
              <span class="timeago">{{ $moment(article.date).fromNow() }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      auth: false,
      articles: []
    };
  },
  props: ["uid"],
  created() {},
  mounted() {
    this.initData();
    this.isauth();
  },
  methods: {
    isauth() {
      if (this.$store.state.user != null) {
        if (this.uid == this.$store.state.user._id) {
          this.auth = true;
        } else {
          this.auth = false;
        }
      } else {
        this.auth = false;
      }
    },
    create() {
      this.$router.push({ name: "Create" });
    },
    initData() {
      this.$axios
        .post("http://192.168.0.106:3001/article/getArticles/" + this.uid)
        .then(res => {
          if (res.data.code === 1) {
            this.articles = res.data.info;
          } else {
            alert(res.data.info);
          }
        });
    }
  }
};
</script>

<style lang="less">
.articleslist {
  &box {
    background: white;
    padding: 20px;
    .title {
      h3 {
        font-size: 24px;
        font-weight: bold;
      }
      display: flex;
      justify-content: space-between;
    }
    .articles {
      ul {
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0px;
          border-bottom: 1px solid #ddd;
          a {
            font-size: 20px;
            color: #222;
            display: flex;
            align-items: center;
            img {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              margin-right: 8px;
            }
          }
        }
      }
    }
  }
}
</style>