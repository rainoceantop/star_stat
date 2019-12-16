<template>
  <div class="wrapper_form" >
    <label class="form_label">{{label}}</label>
    <input class="form_text" :type="type" required @keyup="keyup" />
  </div>
</template>

<script>
export default {
  name: "textInput",
  props: {
    label: String,
    type: String,
    username: String
  },
  data() {
    return {
      
    }
  },
  methods:{
    keyup() {
      this.$emit('onInput')
    }
  },
}
</script>

<style lang="less">

</style>