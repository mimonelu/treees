<template>
  <div class="Home">
    <TextArea
      :value.sync="source"
      @change="onChange"
    />
    <Treees :source="source" />
  </div>
</template>

<script>
import TextArea from '@/components/text-area'
import Treees from '@/components/treees'

export default {
  name: 'Home',

  components: {
    TextArea,
    Treees,
  },

  data () {
    return {
      source: `#pageTitle=Sample Tree

Top: class=red
  Login: class=red
    Authorized area: class=borderless
      Contents
  Password reset: class=red
  Error: class=red

Contents
  About
  Categories
    Fashion
    Foods
  Contact
  Links
    Other site: class=fill
`,
    }
  },

  methods: {
    onChange () {
      // console.log(this.source)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/_variables";

.Home {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  height: 100%;

  .Treees {
    background-color: #ffffff;
    overflow: scroll;
  }
}
</style>
