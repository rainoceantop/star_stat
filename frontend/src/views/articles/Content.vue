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
        <font-awesome-icon :icon="editIcon" class="fa_icon_sma" @click="editArticle" />
        <font-awesome-icon :icon="deleteIcon" class="fa_icon_sma" @click="deleteArticle" />
      </div>
    </div>
    <div class="evaluate_box">
      <a-button type="primary" @click="like" :class="likeClass">
        <a-icon type="smile" v-if="article.likeUsers.includes(uid)" />
        <a-icon type="meh" v-else />
        {{ article.likeUsers.includes(uid) ? '已赞' : '点赞' }}
      </a-button>
    </div>
    <div class="reply_box">
      <ul>
        <li v-for="(comment,index) in comments" :key="index">
          <span class="comment">{{comment.content}}</span>
          <span class="commenttime">{{$moment(comment.date).fromNow()}}</span>
          <a-icon type="delete" @click="deleteComment(comment.commentId)" />
        </li>
      </ul>
      <a-input placeholder="请输入回复内容" v-model="commentHtml" @keyup.enter="comment"></a-input>
      <a-button @click="comment" type="primary">点击回复</a-button>或者在回复框时点击回车（Enter）
    </div>
  </div>
</template>

<script>
import { Button, Icon, Input } from "ant-design-vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faClock, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
export default {
  name: "Content",
  data() {
    return {
      auth: true,
      clockIcon: faClock,
      deleteIcon: faTrash,
      editIcon: faEdit,
      article: {
        title: "", // 文章标题
        content: "", // 文章内容
        date: "", // 创建时间
        likeUsers: [], // 点赞用户列表
        likeId: 1,
        likeClass: "", // 点赞样式
        commentHtml: "", //评论
        comments: []
      }
    };
  },
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Input.name]: Input,
    FontAwesomeIcon
  },
  props: ["articleId", "author"],
  methods: {
    initData() {}
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
    }
    // .message {
    // }
    .ed {
      margin-top: 20px;
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