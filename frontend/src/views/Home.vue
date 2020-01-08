<template>
  <div class="wrapper">
    <div class="wrapper_layout primary_width">
      <div class="articles">
        <div class="articles_box">
          <div class="artciles_tab">
            <a-button>最新</a-button>
            <a-button>热门</a-button>
          </div>
          <div class="artciles_list">
            <ul>
              <li v-for="(article,index) in articles" :key="index">
                <router-link
                  :to="`/${article.author}/articles/${article._id}/content`"
                  class="title"
                >
                  <img :src="article.avatar" class="avatar" />
                  <span>{{ article.title }}</span>
                </router-link>
                <span class="meta pull-right">
                  <span
                    class="like_reply"
                  >{{article.like_users.length}} / {{article.like_users.length}} |</span>
                  <span class="timeago">{{ $moment(article.date).fromNow() }}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="user">
        <div class="user_box">
          <div class="auth_box" v-if="auth">
            <div></div>
          </div>
          <div v-else>
            <div class="login"></div>
            <div class="register"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      auth: this.$store.state.auth || false,
      articles: []
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      //获取所有文章的ID
      this.$axios
        .post(
          "http://192.168.0.106:3001/article/getArticles/" +
            "5e11de485acaf43198792155"
        )
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
<style lang="less" scoped
>
.wrapper {
  padding-top: 20px;
  &_layout {
    display: grid;
    gap: 20px;
    grid-template-columns: 75% 25%;
    justify-items: stretch;
    align-items: start;
    .articles {
      grid-template-areas: "a";
      &_box {
        background: white;
        text-align: left;
        display: grid;
        .artciles_tab {
          padding: 8px;
          display: flex;
          justify-content: flex-start;
          border-bottom: 1px solid #ddd;
        }
        .artciles_list {
          padding: 8px;
          ul {
            li {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 8px 0px;
              border-bottom: 1px solid #ddd;
              a {
                font-size: 16px;
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
    .user {
      grid-template-areas: "b";
    }
  }
}
@media screen and (max-width: 640px) {
  .wrapper_layout {
    width: 100%;
    max-width: 640px;
    display: grid;
    gap: 20px;
    grid-template-columns: 100% !important;
    grid-template-areas:
      "b"
      "a";
    .articles {
      width: 90%;
    }
    .user {
      width: 90%;
    }
  }
}
</style>