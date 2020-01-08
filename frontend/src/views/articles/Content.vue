<template>
  <div class="content">
    <div class="content_box">
      <div class="title">
        <h1>{{ article.title }}</h1>
      </div>
      <div class="date">
        <font-awesome-icon :icon="clockIcon" class="fa_icon_sma" />
        <span>{{ $moment(article.date).fromNow()}}</span>
      </div>
      <div class="message">
        <div class="markdown-body" v-html="article.content"></div>
      </div>
      <div class="ed" v-if="auth">
        <a-button @click="editArticle" type="primary">
          <a-icon type="edit" />修改
        </a-button>
        <a-popconfirm title="确定要删除该文章吗" @confirm="deleteArticle" okText="删除" cancelText="取消">
          <a-button type="danger">
            <a-icon type="delete" />删除
          </a-button>
        </a-popconfirm>
      </div>
    </div>
    <!-- <div class="evaluate_box">
      <a-button type="primary" @click="like" :class="likeClass">
        <a-icon type="smile" v-if="article.like_users.includes(uid)" />
        <a-icon type="meh" v-else />
        {{ article.like_users.includes(uid) ? '已赞' : '点赞' }}
      </a-button>
    </div>-->
    <!-- <div class="reply_box">
      <ul>
        <li v-for="(comment,index) in comments" :key="index">
          <span class="comment">{{comment.content}}</span>
          <span class="commenttime">{{$moment(comment.date).fromNow()}}</span>
          <a-icon type="delete" @click="deleteComment(comment.commentId)" />
        </li>
      </ul>
      <a-input placeholder="请输入回复内容" v-model="commentHtml" @keyup.enter="comment"></a-input>
      <a-button @click="comment" type="primary">点击回复</a-button>或者在回复框时点击回车（Enter）
    </div>-->
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faClock, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
export default {
  name: "Content",
  data() {
    return {
      auth: false,
      clockIcon: faClock,
      deleteIcon: faTrash,
      editIcon: faEdit,
      article: {
        _id: "",
        title: "",
        content: "",
        date: "",
        like_users: []
      }
    };
  },
  created() {
    this.initData();
    this.isauth();
  },
  components: {
    FontAwesomeIcon
  },
  props: ["uid", "articleId"],
  methods: {
    editArticle() {
      this.$router.push({
        name: "Edit",
        params: {
          uid: this.$store.state.user._id,
          articleId: this.article._id
        }
      });
    },
    deleteArticle() {
      console.log(this.uid);
      this.$axios
        .post("http://192.168.0.106:3001/article/delete", {
          aid: this.articleId,
          author: this.$store.state.user._id
        })
        .then(res => {
          console.log(res);
          this.$router.push({
            name: "List",
            params: { uid: this.$store.state.user._id }
          });
        })
        .catch(err => console.error(err));
    },
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
    initData() {
      this.$store.dispatch("getArticle", this.articleId).then(res => {
        const article = {
          _id: res.data.info._id,
          title: res.data.info.title,
          content: res.data.info.content,
          date: res.data.info.date,
          like_users: res.data.info.like_users
        };
        this.$store.commit("CreateArticle", article);
        this.article = article;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  display: grid;
  gap: 20px;
  &_box {
    background: white;
    padding: 20px;
    .title {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }
    .date {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-bottom: 16px;
    }
    .message {
      .markdown-body {
        text-align: left;
      }
    }
    .ed {
      margin-top: 20px;
      text-align: right;
    }
  }
  .evaluate_box {
    background: white;
    padding: 20px;
    text-align: center;
  }
  .reply_box {
    background: white;
    padding: 20px;
    text-align: left;
    ul {
      li {
        display: flex;
        padding: 4px;
        .comment {
          flex: 1;
        }
      }
    }
    input {
      margin-bottom: 20px;
    }
  }
}
@media screen and (max-width: 640px) {
  .content {
    width: 90%;
    margin: 10px auto 10px auto;
  }
}
</style>