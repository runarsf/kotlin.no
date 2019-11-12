<template>
  <div id='about'>
    <h1>Runar Fredagsvik</h1>
    <p>I am a <strong>professional</strong> hobbyist developer.</p>
    <p>&lt;html&gt;Is this where the website goes?&lt;/html&gt;</p>
    <Consent />
  </div>
</template>

<script>
import Consent from '@/components/Consent.vue'

export default {
  name: 'about',
  components: {
    Consent
  }
}
</script>
