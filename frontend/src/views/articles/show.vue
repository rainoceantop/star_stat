<template>
  <div class="article">
    <div class="article_show">
      <div class="title">
        <h4>{{title}}</h4>
        <div class="edit_delete">
          <a @click="editarticle">
            <font-awesome-icon :icon="edit" style="width:24px;height:24px;" />
          </a>
          <a @click="deletearticle">
            <font-awesome-icon :icon="trash" style="width:24px;height:24px;" />
          </a>
        </div>
      </div>
      <div class="content">{{content}}</div>
    </div>
    <div class="message">
      <label>评论</label>
      <input type="text" v-model="message" />
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
      title: "Lorem ipsum dolor sit amet consectetur.",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      message: ""
    };
  },
  components: {
    FontAwesomeIcon
  },
  methods: {
    editarticle: function() {
      console.log("edit");
    },
    deletearticle: function() {
      console.log("delete");
    }
  }
};
</script>

<style lang='less'>
@import "../../assets/less/articles.less";
</style>