<template lang="html">
  <div id="app">{{ msg }}</div>
  <router-view></router-view>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello Vue2'
    }
  }
}
</script>

<style lang="sass">
</style>
