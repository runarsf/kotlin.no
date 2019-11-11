<template>
  <div id='home'>
    <img alt='Vue logo' src='@/assets/knut.png'>
    <HelloWorld msg='BREAKING NEWS: Knut Souls won Game of the Year 2019!' />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
