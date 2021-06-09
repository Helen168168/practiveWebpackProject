<template>
  <div class="hello">
    <h1 @click="clickMe">{{ msg }}</h1>
    <span v-copyText="msg">复制</span>
    <el-input type='textarea'></el-input>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      msg: 'Please login in'
    }
  },
  methods: {
    ...mapActions('testStore', ["CHANGE_DATE"]),
    clickMe() {
      this.CHANGE_DATE('2021-09-09')
    }
  }
}
</script>

<style scoped>

</style>
