<template>
  <div id='consent'>
    <p>This website uses cookies because of reasons, have a great day!</p>
    <button type='button' @click='accept()'>Aight</button>
  </div>
</template>

<script>
export default {
  name: 'consent',
  data: function () {
    return {
      consensus: this.$cookies.get('consent') || false
    }
  },
  mounted: function () {
    if (this.consensus == false) {
      document.getElementById('consent').style.visibility = 'visible'
    }
  },
  methods: {
    accept: function () {
      this.$cookies.set('consent', true)
      this.consensus = this.$cookies.get('consent')
      document.getElementById('consent').style.visibility = 'hidden'
    }
  }
}
</script>

<style scoped lang='scss'>
#consent {
  width: 100%;
  height: 3rem;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  background-color: #FFFFFF;
  border-radius: 5px 5px 0 0;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

  -webkit-box-shadow: 0px 0px 6px -1px rgba(0,0,0,0.61);
  -moz-box-shadow: 0px 0px 6px -1px rgba(0,0,0,0.61);
  box-shadow: 0px 0px 6px -1px rgba(0,0,0,0.61);

  visibility: hidden;
}
</style>