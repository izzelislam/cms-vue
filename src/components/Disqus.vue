<template>
  <div>
    <!-- omitted -->
    <div class='comments'>
      <Disqus shortname='comments' />
    </div>
  </div>
</template>

<script>
import { Disqus } from 'vue-disqus'

export default {
  name: 'DisqusDetail',
  components: {
    Disqus
  }
}
</script>
