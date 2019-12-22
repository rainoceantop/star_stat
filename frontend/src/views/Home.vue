<template>
  <div>home</div>
</template>

<script>
export default {
  name: "home",
  beforeCreate() {
    console.log("beforeCreate" + "create");
  },
  created() {
    console.log("created" + "create");
  },
  beforeMount() {
    console.log("beforeMount" + "create");
  },
  mounted() {
    console.log("mounted" + "create");
  },
  // beforeUpdate() {
  //   console.log("beforeUpdate" + "create");
  // },
  // updated() {
  //   console.log("updated" + "create");
  // },
  beforeActivated() {
    console.log("beforeActivated" + "create");
  },
  activated() {
    console.log("beforeActivated" + "create");
  },

  beforeDestory() {
    console.log("beforeDestory" + "create");
  },
  destoryed() {
    console.log("destoryed" + "create");
  }
};
</script>

<style>
</style>