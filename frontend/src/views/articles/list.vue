<template>
  <div class="article">
    <div class="article_list">
      <ul>
        <!-- <li v-for="(item,obj ) in article">
          <h4>{{item}}</h4>
          <div>{{item.content}}</div>
        </li>-->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      articles: [
        { title: "55555555555555", content: "88888888888888888888" },
        { title: "55555555555555", content: "88888888888888888888" },
        { title: "55555555555555", content: "88888888888888888888" }
      ]
    };
  }
};
</script>

<style>
</style>