<template>
  <div class="articleslist">
    <div class="articleslistbox">
      <div class="title">
        <h3>文章专栏</h3>
        <a-button type="primary" @click="create">
          <a-icon type="highlight" />创作文章
        </a-button>
      </div>
      <div class="articles">
        <ul>
          <li v-for="(article,index) in articles" :key="index">
            <router-link :to="`/articles/${article.articleId}/content`" class="title">
              <img v-if="user" :src="user.avatar" class="avatar" />
              <span>{{ article.title }}</span>
            </router-link>
            <!-- <span class="meta pull-right">
              <span class="timeago">{{ $moment(article.date).fromNow() }}</span>
            </span>-->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Icon } from "ant-design-vue";
export default {
  name: "list",
  data() {
    return {
      isauthor: false,
      user: {},
      articles: []
    };
  },
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  created() {
    console.log("created.list");
    this.initData();
  },
  methods: {
    create() {
      this.$router.push({ name: "Create" });
    },
    initData() {
      //通过axios获取数据，闯入用户ID（从路由获取）,获取传入ID的所有的
      // this.axios.post();
      this.$axios
        .post(
          "http://192.168.0.100:3001/article/getArticles/" +
            this.$router.params.uid
        )
        .then(res => {
          console.log("initdata");
          console.log(res);
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